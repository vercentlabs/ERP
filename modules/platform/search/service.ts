import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { searchRepository } from "./repository";
import { searchCreateSchema, searchListSchema, searchUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SearchActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const searchService = {
  async list(input: unknown) {
    return searchRepository.list(searchListSchema.parse(input));
  },

  async create(input: unknown, context: SearchActionContext) {
    const parsed = searchCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return searchRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SearchActionContext) {
    const current = await searchRepository.getById(tenantId, id);
    if (!current) throw new Error("Search record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return searchRepository.update(tenantId, id, searchUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SearchActionContext) {
    const current = await searchRepository.getById(tenantId, id);
    if (!current) throw new Error("Search record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return searchRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await searchRepository.getById(tenantId, id);
    if (!record) throw new Error("Search record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
