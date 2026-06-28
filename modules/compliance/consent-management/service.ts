import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { consentManagementRepository } from "./repository";
import { consentManagementCreateSchema, consentManagementListSchema, consentManagementUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ConsentManagementActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const consentManagementService = {
  async list(input: unknown) {
    return consentManagementRepository.list(consentManagementListSchema.parse(input));
  },

  async create(input: unknown, context: ConsentManagementActionContext) {
    const parsed = consentManagementCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return consentManagementRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ConsentManagementActionContext) {
    const current = await consentManagementRepository.getById(tenantId, id);
    if (!current) throw new Error("Consent Management record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return consentManagementRepository.update(tenantId, id, consentManagementUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ConsentManagementActionContext) {
    const current = await consentManagementRepository.getById(tenantId, id);
    if (!current) throw new Error("Consent Management record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return consentManagementRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await consentManagementRepository.getById(tenantId, id);
    if (!record) throw new Error("Consent Management record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
