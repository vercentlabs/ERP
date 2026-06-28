export const manifest = {
  domain: "quality",
  module: "corrective-actions",
  displayName: "Corrective Actions",
  routeBase: "/api/quality/corrective-actions",
  table: "quality_corrective_actions",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
