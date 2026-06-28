import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { biConnectorsRepository } from "./repository";
import { biConnectorsCreateSchema, biConnectorsListSchema, biConnectorsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { BiConnectorsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const biConnectorsService = {
  async list(input: unknown) {
    return biConnectorsRepository.list(biConnectorsListSchema.parse(input));
  },

  async create(input: unknown, context: BiConnectorsActionContext) {
    const parsed = biConnectorsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return biConnectorsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: BiConnectorsActionContext) {
    const current = await biConnectorsRepository.getById(tenantId, id);
    if (!current) throw new Error("Bi Connectors record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return biConnectorsRepository.update(tenantId, id, biConnectorsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: BiConnectorsActionContext) {
    const current = await biConnectorsRepository.getById(tenantId, id);
    if (!current) throw new Error("Bi Connectors record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return biConnectorsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await biConnectorsRepository.getById(tenantId, id);
    if (!record) throw new Error("Bi Connectors record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
