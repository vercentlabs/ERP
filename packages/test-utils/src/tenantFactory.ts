export function createTenant(overrides: Partial<{ id: string; name: string; plan: string }> = {}) {
  return { id: "tenant_test", name: "Test Tenant", plan: "growth", ...overrides };
}
