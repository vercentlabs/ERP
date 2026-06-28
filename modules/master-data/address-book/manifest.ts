export const manifest = {
  domain: "master-data",
  module: "address-book",
  displayName: "Address Book",
  routeBase: "/api/master-data/address-book",
  table: "master-data_address_book",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
