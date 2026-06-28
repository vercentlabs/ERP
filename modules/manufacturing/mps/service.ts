import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { mpsRepository } from "./repository";
import { mpsCreateSchema, mpsListSchema, mpsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { MpsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const mpsService = {
  async list(input: unknown) {
    return mpsRepository.list(mpsListSchema.parse(input));
  },

  async create(input: unknown, context: MpsActionContext) {
    const parsed = mpsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return mpsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: MpsActionContext) {
    const current = await mpsRepository.getById(tenantId, id);
    if (!current) throw new Error("Mps record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return mpsRepository.update(tenantId, id, mpsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: MpsActionContext) {
    const current = await mpsRepository.getById(tenantId, id);
    if (!current) throw new Error("Mps record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return mpsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await mpsRepository.getById(tenantId, id);
    if (!record) throw new Error("Mps record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
