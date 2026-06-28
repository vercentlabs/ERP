import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { foodAndBeverageRepository } from "./repository";
import { foodAndBeverageCreateSchema, foodAndBeverageListSchema, foodAndBeverageUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { FoodAndBeverageActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const foodAndBeverageService = {
  async list(input: unknown) {
    return foodAndBeverageRepository.list(foodAndBeverageListSchema.parse(input));
  },

  async create(input: unknown, context: FoodAndBeverageActionContext) {
    const parsed = foodAndBeverageCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return foodAndBeverageRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: FoodAndBeverageActionContext) {
    const current = await foodAndBeverageRepository.getById(tenantId, id);
    if (!current) throw new Error("Food And Beverage record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return foodAndBeverageRepository.update(tenantId, id, foodAndBeverageUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: FoodAndBeverageActionContext) {
    const current = await foodAndBeverageRepository.getById(tenantId, id);
    if (!current) throw new Error("Food And Beverage record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return foodAndBeverageRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await foodAndBeverageRepository.getById(tenantId, id);
    if (!record) throw new Error("Food And Beverage record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
