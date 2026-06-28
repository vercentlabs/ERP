import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { employmentContractsRepository } from "./repository";
import { employmentContractsCreateSchema, employmentContractsListSchema, employmentContractsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EmploymentContractsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const employmentContractsService = {
  async list(input: unknown) {
    return employmentContractsRepository.list(employmentContractsListSchema.parse(input));
  },

  async create(input: unknown, context: EmploymentContractsActionContext) {
    const parsed = employmentContractsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return employmentContractsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EmploymentContractsActionContext) {
    const current = await employmentContractsRepository.getById(tenantId, id);
    if (!current) throw new Error("Employment Contracts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return employmentContractsRepository.update(tenantId, id, employmentContractsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EmploymentContractsActionContext) {
    const current = await employmentContractsRepository.getById(tenantId, id);
    if (!current) throw new Error("Employment Contracts record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return employmentContractsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await employmentContractsRepository.getById(tenantId, id);
    if (!record) throw new Error("Employment Contracts record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
