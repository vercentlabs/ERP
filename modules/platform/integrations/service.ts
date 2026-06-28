import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { integrationsRepository } from "./repository";
import { integrationsCreateSchema, integrationsListSchema, integrationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { IntegrationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const integrationsService = {
  async list(input: unknown) {
    return integrationsRepository.list(integrationsListSchema.parse(input));
  },

  async create(input: unknown, context: IntegrationsActionContext) {
    const parsed = integrationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return integrationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: IntegrationsActionContext) {
    const current = await integrationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Integrations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return integrationsRepository.update(tenantId, id, integrationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: IntegrationsActionContext) {
    const current = await integrationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Integrations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return integrationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await integrationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Integrations record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
