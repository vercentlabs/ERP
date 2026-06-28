import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { mobileScanningRepository } from "./repository";
import { mobileScanningCreateSchema, mobileScanningListSchema, mobileScanningUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { MobileScanningActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const mobileScanningService = {
  async list(input: unknown) {
    return mobileScanningRepository.list(mobileScanningListSchema.parse(input));
  },

  async create(input: unknown, context: MobileScanningActionContext) {
    const parsed = mobileScanningCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return mobileScanningRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: MobileScanningActionContext) {
    const current = await mobileScanningRepository.getById(tenantId, id);
    if (!current) throw new Error("Mobile Scanning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return mobileScanningRepository.update(tenantId, id, mobileScanningUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: MobileScanningActionContext) {
    const current = await mobileScanningRepository.getById(tenantId, id);
    if (!current) throw new Error("Mobile Scanning record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return mobileScanningRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await mobileScanningRepository.getById(tenantId, id);
    if (!record) throw new Error("Mobile Scanning record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
