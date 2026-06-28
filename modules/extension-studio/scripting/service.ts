import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { scriptingRepository } from "./repository";
import { scriptingCreateSchema, scriptingListSchema, scriptingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ScriptingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const scriptingService = {
  async list(input: unknown) {
    return scriptingRepository.list(scriptingListSchema.parse(input));
  },

  async create(input: unknown, context: ScriptingActionContext) {
    const parsed = scriptingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return scriptingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ScriptingActionContext) {
    const current = await scriptingRepository.getById(tenantId, id);
    if (!current) throw new Error("Scripting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return scriptingRepository.update(tenantId, id, scriptingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ScriptingActionContext) {
    const current = await scriptingRepository.getById(tenantId, id);
    if (!current) throw new Error("Scripting record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return scriptingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await scriptingRepository.getById(tenantId, id);
    if (!record) throw new Error("Scripting record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
