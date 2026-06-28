import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { recruitmentRepository } from "./repository";
import { recruitmentCreateSchema, recruitmentListSchema, recruitmentUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RecruitmentActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const recruitmentService = {
  async list(input: unknown) {
    return recruitmentRepository.list(recruitmentListSchema.parse(input));
  },

  async create(input: unknown, context: RecruitmentActionContext) {
    const parsed = recruitmentCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return recruitmentRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RecruitmentActionContext) {
    const current = await recruitmentRepository.getById(tenantId, id);
    if (!current) throw new Error("Recruitment record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return recruitmentRepository.update(tenantId, id, recruitmentUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RecruitmentActionContext) {
    const current = await recruitmentRepository.getById(tenantId, id);
    if (!current) throw new Error("Recruitment record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return recruitmentRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await recruitmentRepository.getById(tenantId, id);
    if (!record) throw new Error("Recruitment record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
