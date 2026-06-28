import type { ActorContext, TenantScope } from "@vercent/shared-types";

export type AttributeRule = {
  attribute: string;
  equals: string | number | boolean;
};

export function satisfiesTenantScope(actor: ActorContext, record: TenantScope) {
  if (actor.tenantId !== record.tenantId) return false;
  if (record.companyId && actor.companyId && record.companyId !== actor.companyId) return false;
  if (record.branchId && actor.branchId && record.branchId !== actor.branchId) return false;
  return true;
}

export function satisfiesAttributes(actor: ActorContext, rules: AttributeRule[] = []) {
  return rules.every((rule) => actor.attributes?.[rule.attribute] === rule.equals);
}
