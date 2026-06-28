export const manifest = {
  domain: "platform",
  module: "audit-logs",
  displayName: "Audit Logs",
  routeBase: "/api/platform/audit-logs",
  table: "platform_audit_logs",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
