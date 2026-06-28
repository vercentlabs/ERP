import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { campaignsRepository } from "./repository";
import { campaignsCreateSchema, campaignsListSchema, campaignsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CampaignsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const campaignsService = {
  async list(input: unknown) {
    return campaignsRepository.list(campaignsListSchema.parse(input));
  },

  async create(input: unknown, context: CampaignsActionContext) {
    const parsed = campaignsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return campaignsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CampaignsActionContext) {
    const current = await campaignsRepository.getById(tenantId, id);
    if (!current) throw new Error("Campaigns record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return campaignsRepository.update(tenantId, id, campaignsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CampaignsActionContext) {
    const current = await campaignsRepository.getById(tenantId, id);
    if (!current) throw new Error("Campaigns record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return campaignsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await campaignsRepository.getById(tenantId, id);
    if (!record) throw new Error("Campaigns record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
