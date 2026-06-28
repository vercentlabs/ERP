import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { documentIntelligenceRepository } from "./repository";
import { documentIntelligenceCreateSchema, documentIntelligenceListSchema, documentIntelligenceUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { DocumentIntelligenceActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const documentIntelligenceService = {
  async list(input: unknown) {
    return documentIntelligenceRepository.list(documentIntelligenceListSchema.parse(input));
  },

  async create(input: unknown, context: DocumentIntelligenceActionContext) {
    const parsed = documentIntelligenceCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return documentIntelligenceRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: DocumentIntelligenceActionContext) {
    const current = await documentIntelligenceRepository.getById(tenantId, id);
    if (!current) throw new Error("Document Intelligence record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return documentIntelligenceRepository.update(tenantId, id, documentIntelligenceUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: DocumentIntelligenceActionContext) {
    const current = await documentIntelligenceRepository.getById(tenantId, id);
    if (!current) throw new Error("Document Intelligence record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return documentIntelligenceRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await documentIntelligenceRepository.getById(tenantId, id);
    if (!record) throw new Error("Document Intelligence record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
