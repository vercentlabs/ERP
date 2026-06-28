import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { cdcRepository } from "./repository";
import { cdcCreateSchema, cdcListSchema, cdcUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { CdcActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const cdcService = {
  async list(input: unknown) {
    return cdcRepository.list(cdcListSchema.parse(input));
  },

  async create(input: unknown, context: CdcActionContext) {
    const parsed = cdcCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return cdcRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: CdcActionContext) {
    const current = await cdcRepository.getById(tenantId, id);
    if (!current) throw new Error("Cdc record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return cdcRepository.update(tenantId, id, cdcUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: CdcActionContext) {
    const current = await cdcRepository.getById(tenantId, id);
    if (!current) throw new Error("Cdc record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return cdcRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await cdcRepository.getById(tenantId, id);
    if (!record) throw new Error("Cdc record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
