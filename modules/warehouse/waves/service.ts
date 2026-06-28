import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { wavesRepository } from "./repository";
import { wavesCreateSchema, wavesListSchema, wavesUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { WavesActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const wavesService = {
  async list(input: unknown) {
    return wavesRepository.list(wavesListSchema.parse(input));
  },

  async create(input: unknown, context: WavesActionContext) {
    const parsed = wavesCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return wavesRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: WavesActionContext) {
    const current = await wavesRepository.getById(tenantId, id);
    if (!current) throw new Error("Waves record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return wavesRepository.update(tenantId, id, wavesUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: WavesActionContext) {
    const current = await wavesRepository.getById(tenantId, id);
    if (!current) throw new Error("Waves record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return wavesRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await wavesRepository.getById(tenantId, id);
    if (!record) throw new Error("Waves record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
