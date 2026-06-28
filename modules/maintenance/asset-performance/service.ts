import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { assetPerformanceRepository } from "./repository";
import { assetPerformanceCreateSchema, assetPerformanceListSchema, assetPerformanceUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { AssetPerformanceActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const assetPerformanceService = {
  async list(input: unknown) {
    return assetPerformanceRepository.list(assetPerformanceListSchema.parse(input));
  },

  async create(input: unknown, context: AssetPerformanceActionContext) {
    const parsed = assetPerformanceCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return assetPerformanceRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: AssetPerformanceActionContext) {
    const current = await assetPerformanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Asset Performance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return assetPerformanceRepository.update(tenantId, id, assetPerformanceUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: AssetPerformanceActionContext) {
    const current = await assetPerformanceRepository.getById(tenantId, id);
    if (!current) throw new Error("Asset Performance record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return assetPerformanceRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await assetPerformanceRepository.getById(tenantId, id);
    if (!record) throw new Error("Asset Performance record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
