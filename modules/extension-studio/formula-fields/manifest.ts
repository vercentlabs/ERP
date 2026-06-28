export const manifest = {
  domain: "extension-studio",
  module: "formula-fields",
  displayName: "Formula Fields",
  routeBase: "/api/extension-studio/formula-fields",
  table: "extension-studio_formula_fields",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
