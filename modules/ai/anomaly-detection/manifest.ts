export const manifest = {
  domain: "ai",
  module: "anomaly-detection",
  displayName: "Anomaly Detection",
  routeBase: "/api/ai/anomaly-detection",
  table: "ai_anomaly_detection",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
