export function createAuditEvent(action: string, tenantId: string, recordId: string, actorId?: string, metadata: Record<string, unknown> = {}) {
  return { module: "finance.customer-refunds", action, tenantId, recordId, actorId: actorId ?? "system", metadata, occurredAt: new Date().toISOString() };
}
