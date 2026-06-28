import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { localizationsIndiaPfRepository } from "./repository";
import { localizationsIndiaPfCreateSchema, localizationsIndiaPfListSchema, localizationsIndiaPfUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LocalizationsIndiaPfActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const localizationsIndiaPfService = {
  async list(input: unknown) {
    return localizationsIndiaPfRepository.list(localizationsIndiaPfListSchema.parse(input));
  },

  async create(input: unknown, context: LocalizationsIndiaPfActionContext) {
    const parsed = localizationsIndiaPfCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return localizationsIndiaPfRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LocalizationsIndiaPfActionContext) {
    const current = await localizationsIndiaPfRepository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Pf record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return localizationsIndiaPfRepository.update(tenantId, id, localizationsIndiaPfUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LocalizationsIndiaPfActionContext) {
    const current = await localizationsIndiaPfRepository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Pf record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return localizationsIndiaPfRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await localizationsIndiaPfRepository.getById(tenantId, id);
    if (!record) throw new Error("Localizations India Pf record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
