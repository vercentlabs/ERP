import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { variantsRepository } from "./repository";
import { variantsCreateSchema, variantsListSchema, variantsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { VariantsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const variantsService = {
  async list(input: unknown) {
    return variantsRepository.list(variantsListSchema.parse(input));
  },

  async create(input: unknown, context: VariantsActionContext) {
    const parsed = variantsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return variantsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: VariantsActionContext) {
    const current = await variantsRepository.getById(tenantId, id);
    if (!current) throw new Error("Variants record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return variantsRepository.update(tenantId, id, variantsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: VariantsActionContext) {
    const current = await variantsRepository.getById(tenantId, id);
    if (!current) throw new Error("Variants record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return variantsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await variantsRepository.getById(tenantId, id);
    if (!record) throw new Error("Variants record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
