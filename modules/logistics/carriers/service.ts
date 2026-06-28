import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { carriersRepository } from "./repository";
import { carriersCreateSchema, carriersListSchema, carriersUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CarriersActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const carriersService = {
  async list(input: unknown) {
    return carriersRepository.list(carriersListSchema.parse(input));
  },

  async create(input: unknown, context: CarriersActionContext) {
    const parsed = carriersCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return carriersRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CarriersActionContext) {
    const current = await carriersRepository.getById(tenantId, id);
    if (!current) throw new Error("Carriers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return carriersRepository.update(tenantId, id, carriersUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CarriersActionContext) {
    const current = await carriersRepository.getById(tenantId, id);
    if (!current) throw new Error("Carriers record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return carriersRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await carriersRepository.getById(tenantId, id);
    if (!record) throw new Error("Carriers record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
