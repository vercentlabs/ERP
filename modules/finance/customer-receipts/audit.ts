export function createAuditEvent(action: string, tenantId: string, entityId: string, actorId?: string, metadata: Record<string, unknown> = {}) {
  return { action, tenantId, entityId, actorId, metadata, createdAt: new Date().toISOString() };
}
