import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { serviceWorkOrdersRepository } from "./repository";
import { serviceWorkOrdersCreateSchema, serviceWorkOrdersListSchema, serviceWorkOrdersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ServiceWorkOrdersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const serviceWorkOrdersService = {
  async list(input: unknown) {
    return serviceWorkOrdersRepository.list(serviceWorkOrdersListSchema.parse(input));
  },

  async create(input: unknown, context: ServiceWorkOrdersActionContext) {
    const parsed = serviceWorkOrdersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return serviceWorkOrdersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ServiceWorkOrdersActionContext) {
    const current = await serviceWorkOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Service Work Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return serviceWorkOrdersRepository.update(tenantId, id, serviceWorkOrdersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ServiceWorkOrdersActionContext) {
    const current = await serviceWorkOrdersRepository.getById(tenantId, id);
    if (!current) throw new Error("Service Work Orders record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return serviceWorkOrdersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await serviceWorkOrdersRepository.getById(tenantId, id);
    if (!record) throw new Error("Service Work Orders record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
