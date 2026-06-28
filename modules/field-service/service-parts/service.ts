import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { servicePartsRepository } from "./repository";
import { servicePartsCreateSchema, servicePartsListSchema, servicePartsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ServicePartsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const servicePartsService = {
  async list(input: unknown) {
    return servicePartsRepository.list(servicePartsListSchema.parse(input));
  },

  async create(input: unknown, context: ServicePartsActionContext) {
    const parsed = servicePartsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return servicePartsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ServicePartsActionContext) {
    const current = await servicePartsRepository.getById(tenantId, id);
    if (!current) throw new Error("Service Parts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return servicePartsRepository.update(tenantId, id, servicePartsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ServicePartsActionContext) {
    const current = await servicePartsRepository.getById(tenantId, id);
    if (!current) throw new Error("Service Parts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return servicePartsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await servicePartsRepository.getById(tenantId, id);
    if (!record) throw new Error("Service Parts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
