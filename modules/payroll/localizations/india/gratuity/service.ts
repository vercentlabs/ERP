import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { localizationsIndiaGratuityRepository } from "./repository";
import { localizationsIndiaGratuityCreateSchema, localizationsIndiaGratuityListSchema, localizationsIndiaGratuityUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LocalizationsIndiaGratuityActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const localizationsIndiaGratuityService = {
  async list(input: unknown) {
    return localizationsIndiaGratuityRepository.list(localizationsIndiaGratuityListSchema.parse(input));
  },

  async create(input: unknown, context: LocalizationsIndiaGratuityActionContext) {
    const parsed = localizationsIndiaGratuityCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return localizationsIndiaGratuityRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LocalizationsIndiaGratuityActionContext) {
    const current = await localizationsIndiaGratuityRepository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Gratuity record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return localizationsIndiaGratuityRepository.update(tenantId, id, localizationsIndiaGratuityUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LocalizationsIndiaGratuityActionContext) {
    const current = await localizationsIndiaGratuityRepository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Gratuity record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return localizationsIndiaGratuityRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await localizationsIndiaGratuityRepository.getById(tenantId, id);
    if (!record) throw new Error("Localizations India Gratuity record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
