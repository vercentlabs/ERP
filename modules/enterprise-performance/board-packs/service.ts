import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { boardPacksRepository } from "./repository";
import { boardPacksCreateSchema, boardPacksListSchema, boardPacksUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BoardPacksActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const boardPacksService = {
  async list(input: unknown) {
    return boardPacksRepository.list(boardPacksListSchema.parse(input));
  },

  async create(input: unknown, context: BoardPacksActionContext) {
    const parsed = boardPacksCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return boardPacksRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BoardPacksActionContext) {
    const current = await boardPacksRepository.getById(tenantId, id);
    if (!current) throw new Error("Board Packs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return boardPacksRepository.update(tenantId, id, boardPacksUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BoardPacksActionContext) {
    const current = await boardPacksRepository.getById(tenantId, id);
    if (!current) throw new Error("Board Packs record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return boardPacksRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await boardPacksRepository.getById(tenantId, id);
    if (!record) throw new Error("Board Packs record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
