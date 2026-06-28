import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { wholesaleDistributionRepository } from "./repository";
import { wholesaleDistributionCreateSchema, wholesaleDistributionListSchema, wholesaleDistributionUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { WholesaleDistributionActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const wholesaleDistributionService = {
  async list(input: unknown) {
    return wholesaleDistributionRepository.list(wholesaleDistributionListSchema.parse(input));
  },

  async create(input: unknown, context: WholesaleDistributionActionContext) {
    const parsed = wholesaleDistributionCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return wholesaleDistributionRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: WholesaleDistributionActionContext) {
    const current = await wholesaleDistributionRepository.getById(tenantId, id);
    if (!current) throw new Error("Wholesale Distribution record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return wholesaleDistributionRepository.update(tenantId, id, wholesaleDistributionUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: WholesaleDistributionActionContext) {
    const current = await wholesaleDistributionRepository.getById(tenantId, id);
    if (!current) throw new Error("Wholesale Distribution record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return wholesaleDistributionRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await wholesaleDistributionRepository.getById(tenantId, id);
    if (!record) throw new Error("Wholesale Distribution record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
