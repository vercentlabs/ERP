import type { ActorContext, TenantScope } from "@vercent/shared-types";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { permissions } from "./permissions";

export function canReadDeveloperPortal(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.read, record }).allowed;
}

export function canApproveDeveloperPortal(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.approve, record }).allowed;
}
