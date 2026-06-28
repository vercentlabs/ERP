import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { returnsRepairsRepository } from "./repository";
import { returnsRepairsCreateSchema, returnsRepairsListSchema, returnsRepairsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ReturnsRepairsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const returnsRepairsService = {
  async list(input: unknown) {
    return returnsRepairsRepository.list(returnsRepairsListSchema.parse(input));
  },

  async create(input: unknown, context: ReturnsRepairsActionContext) {
    const parsed = returnsRepairsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return returnsRepairsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ReturnsRepairsActionContext) {
    const current = await returnsRepairsRepository.getById(tenantId, id);
    if (!current) throw new Error("Returns Repairs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return returnsRepairsRepository.update(tenantId, id, returnsRepairsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ReturnsRepairsActionContext) {
    const current = await returnsRepairsRepository.getById(tenantId, id);
    if (!current) throw new Error("Returns Repairs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return returnsRepairsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await returnsRepairsRepository.getById(tenantId, id);
    if (!record) throw new Error("Returns Repairs record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
