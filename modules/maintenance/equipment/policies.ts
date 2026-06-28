import type { ActorContext, TenantScope } from "@vercent/shared-types";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { permissions } from "./permissions";

export function canReadEquipment(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.read, record }).allowed;
}

export function canApproveEquipment(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.approve, record }).allowed;
}
