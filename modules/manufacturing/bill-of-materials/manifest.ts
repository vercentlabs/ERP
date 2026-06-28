export const manifest = {
  domain: "manufacturing",
  module: "bill-of-materials",
  displayName: "Bill Of Materials",
  routeBase: "/api/manufacturing/bill-of-materials",
  table: "manufacturing_bill_of_materials",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
