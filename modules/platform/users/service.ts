import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { usersRepository } from "./repository";
import { usersCreateSchema, usersListSchema, usersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { UsersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const usersService = {
  async list(input: unknown) {
    return usersRepository.list(usersListSchema.parse(input));
  },

  async create(input: unknown, context: UsersActionContext) {
    const parsed = usersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return usersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: UsersActionContext) {
    const current = await usersRepository.getById(tenantId, id);
    if (!current) throw new Error("Users record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return usersRepository.update(tenantId, id, usersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: UsersActionContext) {
    const current = await usersRepository.getById(tenantId, id);
    if (!current) throw new Error("Users record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return usersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await usersRepository.getById(tenantId, id);
    if (!record) throw new Error("Users record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
