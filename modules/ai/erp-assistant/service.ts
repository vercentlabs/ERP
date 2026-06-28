import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { erpAssistantRepository } from "./repository";
import { erpAssistantCreateSchema, erpAssistantListSchema, erpAssistantUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ErpAssistantActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const erpAssistantService = {
  async list(input: unknown) {
    return erpAssistantRepository.list(erpAssistantListSchema.parse(input));
  },

  async create(input: unknown, context: ErpAssistantActionContext) {
    const parsed = erpAssistantCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return erpAssistantRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ErpAssistantActionContext) {
    const current = await erpAssistantRepository.getById(tenantId, id);
    if (!current) throw new Error("Erp Assistant record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return erpAssistantRepository.update(tenantId, id, erpAssistantUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ErpAssistantActionContext) {
    const current = await erpAssistantRepository.getById(tenantId, id);
    if (!current) throw new Error("Erp Assistant record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return erpAssistantRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await erpAssistantRepository.getById(tenantId, id);
    if (!record) throw new Error("Erp Assistant record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
