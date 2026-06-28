import type { ActorContext, TenantScope } from "@vercent/shared-types";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { permissions } from "./permissions";

export function canReadPreventiveMaintenance(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.read, record }).allowed;
}

export function canApprovePreventiveMaintenance(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.approve, record }).allowed;
}
