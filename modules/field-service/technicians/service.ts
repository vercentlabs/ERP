import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { techniciansRepository } from "./repository";
import { techniciansCreateSchema, techniciansListSchema, techniciansUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { TechniciansActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const techniciansService = {
  async list(input: unknown) {
    return techniciansRepository.list(techniciansListSchema.parse(input));
  },

  async create(input: unknown, context: TechniciansActionContext) {
    const parsed = techniciansCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return techniciansRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: TechniciansActionContext) {
    const current = await techniciansRepository.getById(tenantId, id);
    if (!current) throw new Error("Technicians record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return techniciansRepository.update(tenantId, id, techniciansUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: TechniciansActionContext) {
    const current = await techniciansRepository.getById(tenantId, id);
    if (!current) throw new Error("Technicians record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return techniciansRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await techniciansRepository.getById(tenantId, id);
    if (!record) throw new Error("Technicians record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
