import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { segmentsRepository } from "./repository";
import { segmentsCreateSchema, segmentsListSchema, segmentsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { SegmentsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const segmentsService = {
  async list(input: unknown) {
    return segmentsRepository.list(segmentsListSchema.parse(input));
  },

  async create(input: unknown, context: SegmentsActionContext) {
    const parsed = segmentsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return segmentsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: SegmentsActionContext) {
    const current = await segmentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Segments record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return segmentsRepository.update(tenantId, id, segmentsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: SegmentsActionContext) {
    const current = await segmentsRepository.getById(tenantId, id);
    if (!current) throw new Error("Segments record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return segmentsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await segmentsRepository.getById(tenantId, id);
    if (!record) throw new Error("Segments record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
