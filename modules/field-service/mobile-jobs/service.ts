import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { mobileJobsRepository } from "./repository";
import { mobileJobsCreateSchema, mobileJobsListSchema, mobileJobsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { MobileJobsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const mobileJobsService = {
  async list(input: unknown) {
    return mobileJobsRepository.list(mobileJobsListSchema.parse(input));
  },

  async create(input: unknown, context: MobileJobsActionContext) {
    const parsed = mobileJobsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return mobileJobsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: MobileJobsActionContext) {
    const current = await mobileJobsRepository.getById(tenantId, id);
    if (!current) throw new Error("Mobile Jobs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return mobileJobsRepository.update(tenantId, id, mobileJobsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: MobileJobsActionContext) {
    const current = await mobileJobsRepository.getById(tenantId, id);
    if (!current) throw new Error("Mobile Jobs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return mobileJobsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await mobileJobsRepository.getById(tenantId, id);
    if (!record) throw new Error("Mobile Jobs record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
