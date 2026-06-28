export const manifest = {
  domain: "industry-packs",
  module: "food-and-beverage",
  displayName: "Food And Beverage",
  routeBase: "/api/industry-packs/food-and-beverage",
  table: "industry-packs_food_and_beverage",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
