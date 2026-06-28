import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { downtimeRepository } from "./repository";
import { downtimeCreateSchema, downtimeListSchema, downtimeUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DowntimeActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const downtimeService = {
  async list(input: unknown) {
    return downtimeRepository.list(downtimeListSchema.parse(input));
  },

  async create(input: unknown, context: DowntimeActionContext) {
    const parsed = downtimeCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return downtimeRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DowntimeActionContext) {
    const current = await downtimeRepository.getById(tenantId, id);
    if (!current) throw new Error("Downtime record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return downtimeRepository.update(tenantId, id, downtimeUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DowntimeActionContext) {
    const current = await downtimeRepository.getById(tenantId, id);
    if (!current) throw new Error("Downtime record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return downtimeRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await downtimeRepository.getById(tenantId, id);
    if (!record) throw new Error("Downtime record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
