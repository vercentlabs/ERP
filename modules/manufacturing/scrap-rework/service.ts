import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { scrapReworkRepository } from "./repository";
import { scrapReworkCreateSchema, scrapReworkListSchema, scrapReworkUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ScrapReworkActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const scrapReworkService = {
  async list(input: unknown) {
    return scrapReworkRepository.list(scrapReworkListSchema.parse(input));
  },

  async create(input: unknown, context: ScrapReworkActionContext) {
    const parsed = scrapReworkCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return scrapReworkRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ScrapReworkActionContext) {
    const current = await scrapReworkRepository.getById(tenantId, id);
    if (!current) throw new Error("Scrap Rework record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return scrapReworkRepository.update(tenantId, id, scrapReworkUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ScrapReworkActionContext) {
    const current = await scrapReworkRepository.getById(tenantId, id);
    if (!current) throw new Error("Scrap Rework record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return scrapReworkRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await scrapReworkRepository.getById(tenantId, id);
    if (!record) throw new Error("Scrap Rework record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
