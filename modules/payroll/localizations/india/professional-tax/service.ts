import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { localizationsIndiaProfessionalTaxRepository } from "./repository";
import { localizationsIndiaProfessionalTaxCreateSchema, localizationsIndiaProfessionalTaxListSchema, localizationsIndiaProfessionalTaxUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LocalizationsIndiaProfessionalTaxActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const localizationsIndiaProfessionalTaxService = {
  async list(input: unknown) {
    return localizationsIndiaProfessionalTaxRepository.list(localizationsIndiaProfessionalTaxListSchema.parse(input));
  },

  async create(input: unknown, context: LocalizationsIndiaProfessionalTaxActionContext) {
    const parsed = localizationsIndiaProfessionalTaxCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return localizationsIndiaProfessionalTaxRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LocalizationsIndiaProfessionalTaxActionContext) {
    const current = await localizationsIndiaProfessionalTaxRepository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Professional Tax record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return localizationsIndiaProfessionalTaxRepository.update(tenantId, id, localizationsIndiaProfessionalTaxUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LocalizationsIndiaProfessionalTaxActionContext) {
    const current = await localizationsIndiaProfessionalTaxRepository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Professional Tax record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return localizationsIndiaProfessionalTaxRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await localizationsIndiaProfessionalTaxRepository.getById(tenantId, id);
    if (!record) throw new Error("Localizations India Professional Tax record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
