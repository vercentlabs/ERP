import type { BusinessEvent } from "@vercent/shared-types";
import { events } from "./events";

export function createAuditEvent(
  type: keyof typeof events,
  tenantId: string,
  aggregateId: string,
  actorId: string,
  payload: Record<string, unknown> = {},
): BusinessEvent {
  return {
    id: crypto.randomUUID?.() ?? `${Date.now()}`,
    type: events[type],
    tenantId,
    aggregateId,
    aggregateType: "finance/bank-accounts",
    actorId,
    payload,
    occurredAt: new Date().toISOString(),
  };
}
