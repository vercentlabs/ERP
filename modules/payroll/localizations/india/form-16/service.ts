import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { localizationsIndiaForm16Repository } from "./repository";
import { localizationsIndiaForm16CreateSchema, localizationsIndiaForm16ListSchema, localizationsIndiaForm16UpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LocalizationsIndiaForm16ActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const localizationsIndiaForm16Service = {
  async list(input: unknown) {
    return localizationsIndiaForm16Repository.list(localizationsIndiaForm16ListSchema.parse(input));
  },

  async create(input: unknown, context: LocalizationsIndiaForm16ActionContext) {
    const parsed = localizationsIndiaForm16CreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return localizationsIndiaForm16Repository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LocalizationsIndiaForm16ActionContext) {
    const current = await localizationsIndiaForm16Repository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Form 16 record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return localizationsIndiaForm16Repository.update(tenantId, id, localizationsIndiaForm16UpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LocalizationsIndiaForm16ActionContext) {
    const current = await localizationsIndiaForm16Repository.getById(tenantId, id);
    if (!current) throw new Error("Localizations India Form 16 record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return localizationsIndiaForm16Repository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await localizationsIndiaForm16Repository.getById(tenantId, id);
    if (!record) throw new Error("Localizations India Form 16 record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
