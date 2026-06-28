import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { processManufacturingRepository } from "./repository";
import { processManufacturingCreateSchema, processManufacturingListSchema, processManufacturingUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { ProcessManufacturingActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const processManufacturingService = {
  async list(input: unknown) {
    return processManufacturingRepository.list(processManufacturingListSchema.parse(input));
  },

  async create(input: unknown, context: ProcessManufacturingActionContext) {
    const parsed = processManufacturingCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return processManufacturingRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: ProcessManufacturingActionContext) {
    const current = await processManufacturingRepository.getById(tenantId, id);
    if (!current) throw new Error("Process Manufacturing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return processManufacturingRepository.update(tenantId, id, processManufacturingUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: ProcessManufacturingActionContext) {
    const current = await processManufacturingRepository.getById(tenantId, id);
    if (!current) throw new Error("Process Manufacturing record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return processManufacturingRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await processManufacturingRepository.getById(tenantId, id);
    if (!record) throw new Error("Process Manufacturing record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
