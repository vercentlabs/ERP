export const manifest = {
  domain: "compliance",
  module: "approvals-audit",
  displayName: "Approvals Audit",
  routeBase: "/api/compliance/approvals-audit",
  table: "compliance_approvals_audit",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
