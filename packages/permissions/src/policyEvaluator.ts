import type { ActorContext, TenantScope } from "@vercent/shared-types";
import { satisfiesTenantScope, type AttributeRule, satisfiesAttributes } from "./abac";
import { hasPermission } from "./rbac";

export type PolicyDecision = {
  allowed: boolean;
  reasons: string[];
};

export type PolicyInput = {
  actor: ActorContext;
  permission: string;
  record?: TenantScope;
  rules?: AttributeRule[];
};

export function evaluatePolicy(input: PolicyInput): PolicyDecision {
  const reasons: string[] = [];
  const wildcardPermission = input.permission.includes(":")
    ? input.permission.replace(/:[^:]+$/, ":*")
    : input.permission.replace(/\.[^.]+$/, ".*");
  const hasGrant =
    hasPermission(input.actor.permissions, input.permission) ||
    hasPermission(input.actor.permissions, wildcardPermission);

  if (!hasGrant) reasons.push(`Missing permission ${input.permission}`);
  if (input.record && !satisfiesTenantScope(input.actor, input.record)) {
    reasons.push("Record is outside actor tenant/company/branch scope");
  }
  if (!satisfiesAttributes(input.actor, input.rules)) {
    reasons.push("Actor attributes do not satisfy policy rules");
  }

  return { allowed: reasons.length === 0, reasons };
}
