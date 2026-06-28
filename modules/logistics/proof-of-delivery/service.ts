import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { proofOfDeliveryRepository } from "./repository";
import { proofOfDeliveryCreateSchema, proofOfDeliveryListSchema, proofOfDeliveryUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProofOfDeliveryActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const proofOfDeliveryService = {
  async list(input: unknown) {
    return proofOfDeliveryRepository.list(proofOfDeliveryListSchema.parse(input));
  },

  async create(input: unknown, context: ProofOfDeliveryActionContext) {
    const parsed = proofOfDeliveryCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return proofOfDeliveryRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProofOfDeliveryActionContext) {
    const current = await proofOfDeliveryRepository.getById(tenantId, id);
    if (!current) throw new Error("Proof Of Delivery record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return proofOfDeliveryRepository.update(tenantId, id, proofOfDeliveryUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProofOfDeliveryActionContext) {
    const current = await proofOfDeliveryRepository.getById(tenantId, id);
    if (!current) throw new Error("Proof Of Delivery record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return proofOfDeliveryRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await proofOfDeliveryRepository.getById(tenantId, id);
    if (!record) throw new Error("Proof Of Delivery record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
