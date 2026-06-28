import type { ActorContext, TenantScope } from "@vercent/shared-types";
import { evaluatePolicy } from "@vercent/permissions/policyEvaluator";
import { permissions } from "./permissions";

export function canReadLeads(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.view, record }).allowed;
}

export function canUpdateLeads(actor: ActorContext, record: TenantScope) {
  return evaluatePolicy({ actor, permission: permissions.update, record }).allowed;
}
