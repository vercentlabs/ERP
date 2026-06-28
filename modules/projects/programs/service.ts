import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { programsRepository } from "./repository";
import { programsCreateSchema, programsListSchema, programsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProgramsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const programsService = {
  async list(input: unknown) {
    return programsRepository.list(programsListSchema.parse(input));
  },

  async create(input: unknown, context: ProgramsActionContext) {
    const parsed = programsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return programsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProgramsActionContext) {
    const current = await programsRepository.getById(tenantId, id);
    if (!current) throw new Error("Programs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return programsRepository.update(tenantId, id, programsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProgramsActionContext) {
    const current = await programsRepository.getById(tenantId, id);
    if (!current) throw new Error("Programs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return programsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await programsRepository.getById(tenantId, id);
    if (!record) throw new Error("Programs record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
