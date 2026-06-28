import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { locationsRepository } from "./repository";
import { locationsCreateSchema, locationsListSchema, locationsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { LocationsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const locationsService = {
  async list(input: unknown) {
    return locationsRepository.list(locationsListSchema.parse(input));
  },

  async create(input: unknown, context: LocationsActionContext) {
    const parsed = locationsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return locationsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: LocationsActionContext) {
    const current = await locationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Locations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return locationsRepository.update(tenantId, id, locationsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: LocationsActionContext) {
    const current = await locationsRepository.getById(tenantId, id);
    if (!current) throw new Error("Locations record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return locationsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await locationsRepository.getById(tenantId, id);
    if (!record) throw new Error("Locations record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
