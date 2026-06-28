import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { educationRepository } from "./repository";
import { educationCreateSchema, educationListSchema, educationUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { EducationActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const educationService = {
  async list(input: unknown) {
    return educationRepository.list(educationListSchema.parse(input));
  },

  async create(input: unknown, context: EducationActionContext) {
    const parsed = educationCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return educationRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: EducationActionContext) {
    const current = await educationRepository.getById(tenantId, id);
    if (!current) throw new Error("Education record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return educationRepository.update(tenantId, id, educationUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: EducationActionContext) {
    const current = await educationRepository.getById(tenantId, id);
    if (!current) throw new Error("Education record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return educationRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await educationRepository.getById(tenantId, id);
    if (!record) throw new Error("Education record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
