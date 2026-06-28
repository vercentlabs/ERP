import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { companiesRepository } from "./repository";
import { companiesCreateSchema, companiesListSchema, companiesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CompaniesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const companiesService = {
  async list(input: unknown) {
    return companiesRepository.list(companiesListSchema.parse(input));
  },

  async create(input: unknown, context: CompaniesActionContext) {
    const parsed = companiesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return companiesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CompaniesActionContext) {
    const current = await companiesRepository.getById(tenantId, id);
    if (!current) throw new Error("Companies record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return companiesRepository.update(tenantId, id, companiesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CompaniesActionContext) {
    const current = await companiesRepository.getById(tenantId, id);
    if (!current) throw new Error("Companies record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return companiesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await companiesRepository.getById(tenantId, id);
    if (!record) throw new Error("Companies record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
