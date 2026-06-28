import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { localizationsIndiaTdsRepository } from "./repository";
import { localizationsIndiaTdsCreateSchema, localizationsIndiaTdsListSchema, localizationsIndiaTdsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LocalizationsIndiaTdsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const localizationsIndiaTdsService = {
  async list(input: unknown) {
    return localizationsIndiaTdsRepository.list(localizationsIndiaTdsListSchema.parse(input));
  },

  async create(input: unknown, context: LocalizationsIndiaTdsActionContext) {
    const parsed = localizationsIndiaTdsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return localizationsIndiaTdsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LocalizationsIndiaTdsActionContext) {
    const current = await localizationsIndiaTdsRepository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Tds record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return localizationsIndiaTdsRepository.update(tenantId, id, localizationsIndiaTdsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LocalizationsIndiaTdsActionContext) {
    const current = await localizationsIndiaTdsRepository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Tds record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return localizationsIndiaTdsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await localizationsIndiaTdsRepository.getById(tenantId, id);
    if (!record) throw new Error("Localizations India Tds record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
