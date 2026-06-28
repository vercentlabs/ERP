import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { serviceContractsRepository } from "./repository";
import { serviceContractsCreateSchema, serviceContractsListSchema, serviceContractsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ServiceContractsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const serviceContractsService = {
  async list(input: unknown) {
    return serviceContractsRepository.list(serviceContractsListSchema.parse(input));
  },

  async create(input: unknown, context: ServiceContractsActionContext) {
    const parsed = serviceContractsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return serviceContractsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ServiceContractsActionContext) {
    const current = await serviceContractsRepository.getById(tenantId, id);
    if (!current) throw new Error("Service Contracts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return serviceContractsRepository.update(tenantId, id, serviceContractsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ServiceContractsActionContext) {
    const current = await serviceContractsRepository.getById(tenantId, id);
    if (!current) throw new Error("Service Contracts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return serviceContractsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await serviceContractsRepository.getById(tenantId, id);
    if (!record) throw new Error("Service Contracts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
