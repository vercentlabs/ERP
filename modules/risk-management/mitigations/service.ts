import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { mitigationsRepository } from "./repository";
import { mitigationsCreateSchema, mitigationsListSchema, mitigationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { MitigationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const mitigationsService = {
  async list(input: unknown) {
    return mitigationsRepository.list(mitigationsListSchema.parse(input));
  },

  async create(input: unknown, context: MitigationsActionContext) {
    const parsed = mitigationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return mitigationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: MitigationsActionContext) {
    const current = await mitigationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Mitigations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return mitigationsRepository.update(tenantId, id, mitigationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: MitigationsActionContext) {
    const current = await mitigationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Mitigations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return mitigationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await mitigationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Mitigations record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
