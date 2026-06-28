import { events } from "./events";

export function createAuditEvent(type: (typeof events)[keyof typeof events], actorId: string | undefined, entityId: string, metadata: Record<string, unknown> = {}) {
  return { type, actorId: actorId ?? "system", entityId, metadata, occurredAt: new Date().toISOString() };
}
