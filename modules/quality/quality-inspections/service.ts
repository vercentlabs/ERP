import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { qualityInspectionsRepository } from "./repository";
import { qualityInspectionsCreateSchema, qualityInspectionsListSchema, qualityInspectionsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { QualityInspectionsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const qualityInspectionsService = {
  async list(input: unknown) {
    return qualityInspectionsRepository.list(qualityInspectionsListSchema.parse(input));
  },

  async create(input: unknown, context: QualityInspectionsActionContext) {
    const parsed = qualityInspectionsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return qualityInspectionsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: QualityInspectionsActionContext) {
    const current = await qualityInspectionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Quality Inspections record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return qualityInspectionsRepository.update(tenantId, id, qualityInspectionsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: QualityInspectionsActionContext) {
    const current = await qualityInspectionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Quality Inspections record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return qualityInspectionsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await qualityInspectionsRepository.getById(tenantId, id);
    if (!record) throw new Error("Quality Inspections record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
