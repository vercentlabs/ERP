export const permissions = {
  read: "analytics/embedded-analytics:read",
  create: "analytics/embedded-analytics:create",
  update: "analytics/embedded-analytics:update",
  submit: "analytics/embedded-analytics:submit",
  approve: "analytics/embedded-analytics:approve",
  reject: "analytics/embedded-analytics:reject",
  cancel: "analytics/embedded-analytics:cancel",
  close: "analytics/embedded-analytics:close",
  report: "analytics/embedded-analytics:report",
} as const;

export type EmbeddedAnalyticsPermission = (typeof permissions)[keyof typeof permissions];
