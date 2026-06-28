export function createAuthContext(overrides: Partial<{ tenantId: string; actorId: string; permissions: string[] }> = {}) {
  return {
    tenantId: "tenant_test",
    actorId: "user_test",
    roles: ["admin"],
    permissions: ["*"],
    ...overrides,
  };
}
