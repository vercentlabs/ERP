import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { retailRepository } from "./repository";
import { retailCreateSchema, retailListSchema, retailUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RetailActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const retailService = {
  async list(input: unknown) {
    return retailRepository.list(retailListSchema.parse(input));
  },

  async create(input: unknown, context: RetailActionContext) {
    const parsed = retailCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return retailRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RetailActionContext) {
    const current = await retailRepository.getById(tenantId, id);
    if (!current) throw new Error("Retail record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return retailRepository.update(tenantId, id, retailUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RetailActionContext) {
    const current = await retailRepository.getById(tenantId, id);
    if (!current) throw new Error("Retail record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return retailRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await retailRepository.getById(tenantId, id);
    if (!record) throw new Error("Retail record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
