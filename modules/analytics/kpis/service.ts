import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { kpisRepository } from "./repository";
import { kpisCreateSchema, kpisListSchema, kpisUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { KpisActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const kpisService = {
  async list(input: unknown) {
    return kpisRepository.list(kpisListSchema.parse(input));
  },

  async create(input: unknown, context: KpisActionContext) {
    const parsed = kpisCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return kpisRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: KpisActionContext) {
    const current = await kpisRepository.getById(tenantId, id);
    if (!current) throw new Error("Kpis record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return kpisRepository.update(tenantId, id, kpisUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: KpisActionContext) {
    const current = await kpisRepository.getById(tenantId, id);
    if (!current) throw new Error("Kpis record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return kpisRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await kpisRepository.getById(tenantId, id);
    if (!record) throw new Error("Kpis record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
