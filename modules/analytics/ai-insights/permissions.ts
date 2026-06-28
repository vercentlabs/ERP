export const permissions = {
  read: "analytics/ai-insights:read",
  create: "analytics/ai-insights:create",
  update: "analytics/ai-insights:update",
  submit: "analytics/ai-insights:submit",
  approve: "analytics/ai-insights:approve",
  reject: "analytics/ai-insights:reject",
  cancel: "analytics/ai-insights:cancel",
  close: "analytics/ai-insights:close",
  report: "analytics/ai-insights:report",
} as const;

export type AiInsightsPermission = (typeof permissions)[keyof typeof permissions];
