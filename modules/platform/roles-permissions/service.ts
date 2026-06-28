import { transitionWorkflow } from "@vercent/workflows/workflowRuntime";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { rolesPermissionsRepository } from "./repository";
import { rolesPermissionsCreateSchema, rolesPermissionsListSchema, rolesPermissionsUpdateSchema } from "./schemas";
import { workflowDefinition } from "./workflows";
import { permissions } from "./permissions";
import type { RolesPermissionsActionContext } from "./types";

const assertAllowed = (decision: { allowed: boolean; reasons: string[] }) => {
  if (!decision.allowed) throw new Error(decision.reasons.join("; "));
};

export const rolesPermissionsService = {
  async list(input: unknown) {
    return rolesPermissionsRepository.list(rolesPermissionsListSchema.parse(input));
  },

  async create(input: unknown, context: RolesPermissionsActionContext) {
    const parsed = rolesPermissionsCreateSchema.parse(input);
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.create, record: parsed }));
    return rolesPermissionsRepository.create(parsed, context.actorId);
  },

  async update(tenantId: string, id: string, input: unknown, context: RolesPermissionsActionContext) {
    const current = await rolesPermissionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Roles Permissions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions.update, record: current }));
    return rolesPermissionsRepository.update(tenantId, id, rolesPermissionsUpdateSchema.parse(input), context.actorId);
  },

  async transition(tenantId: string, id: string, action: "submit" | "approve" | "reject" | "cancel" | "close", context: RolesPermissionsActionContext) {
    const current = await rolesPermissionsRepository.getById(tenantId, id);
    if (!current) throw new Error("Roles Permissions record was not found");
    assertAllowed(evaluatePolicy({ actor: context, permission: permissions[action], record: current }));
    const transitioned = transitionWorkflow(workflowDefinition, current, action, context);
    return rolesPermissionsRepository.save({ ...current, ...transitioned });
  },

  async recommendNextAction(tenantId: string, id: string) {
    const record = await rolesPermissionsRepository.getById(tenantId, id);
    if (!record) throw new Error("Roles Permissions record was not found");
    if (record.priority === "critical") return "Escalate to owner dashboard today";
    if (record.status === "draft") return "Submit for approval";
    if (record.status === "submitted") return "Review approval queue";
    return "Monitor through command center";
  },
};
