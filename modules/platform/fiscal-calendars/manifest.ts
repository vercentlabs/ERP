export const manifest = {
  domain: "platform",
  module: "fiscal-calendars",
  displayName: "Fiscal Calendars",
  routeBase: "/api/platform/fiscal-calendars",
  table: "platform_fiscal_calendars",
  tenantScoped: true,
  ownerFocused: true,
  capabilities: ["read", "create", "update", "submit", "approve", "reject", "cancel", "close", "report"],
  aiUseCases: ["summarize", "recommend-next-action", "detect-risk"],
} as const;
