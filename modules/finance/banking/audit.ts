export function createAuditEvent(eventName: string, actorId: string | undefined, recordId: string, metadata: Record<string, unknown> = {}) {
  return { eventName, actorId: actorId ?? "system", recordId, metadata, occurredAt: new Date().toISOString() };
}
