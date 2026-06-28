import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { journalsRepository } from "./repository";
import { journalsCreateSchema, journalsListSchema, journalsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { JournalsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const journalsService = {
  async list(input: unknown) {
    return journalsRepository.list(journalsListSchema.parse(input));
  },

  async create(input: unknown, context: JournalsActionContext) {
    const parsed = journalsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return journalsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: JournalsActionContext) {
    const current = await journalsRepository.getById(tenantId, id);
    if (!current) throw new Error("Journals record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return journalsRepository.update(tenantId, id, journalsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: JournalsActionContext) {
    const current = await journalsRepository.getById(tenantId, id);
    if (!current) throw new Error("Journals record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return journalsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await journalsRepository.getById(tenantId, id);
    if (!record) throw new Error("Journals record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
