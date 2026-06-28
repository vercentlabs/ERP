import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { sdkManagementRepository } from "./repository";
import { sdkManagementCreateSchema, sdkManagementListSchema, sdkManagementUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SdkManagementActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const sdkManagementService = {
  async list(input: unknown) {
    return sdkManagementRepository.list(sdkManagementListSchema.parse(input));
  },

  async create(input: unknown, context: SdkManagementActionContext) {
    const parsed = sdkManagementCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return sdkManagementRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SdkManagementActionContext) {
    const current = await sdkManagementRepository.getById(tenantId, id);
    if (!current) throw new Error("Sdk Management record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return sdkManagementRepository.update(tenantId, id, sdkManagementUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SdkManagementActionContext) {
    const current = await sdkManagementRepository.getById(tenantId, id);
    if (!current) throw new Error("Sdk Management record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return sdkManagementRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await sdkManagementRepository.getById(tenantId, id);
    if (!record) throw new Error("Sdk Management record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
