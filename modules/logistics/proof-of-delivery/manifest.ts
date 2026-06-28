export const manifest = {
  domain: "logistics",
  module: "proof-of-delivery",
  displayName: "Proof Of Delivery",
  routeBase: "/api/logistics/proof-of-delivery",
  table: "logistics_proof_of_delivery",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
