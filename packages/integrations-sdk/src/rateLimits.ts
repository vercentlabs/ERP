export type RateLimit = {
  key: string;
  limit: number;
  windowSeconds: number;
};

export function rateLimitKey(tenantId: string, connectorId: string) {
  return `integration:${tenantId}:${connectorId}`;
}
