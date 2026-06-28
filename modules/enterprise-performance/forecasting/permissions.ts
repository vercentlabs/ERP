export const permissions = {
  read: "enterprise-performance/forecasting:read",
  create: "enterprise-performance/forecasting:create",
  update: "enterprise-performance/forecasting:update",
  submit: "enterprise-performance/forecasting:submit",
  approve: "enterprise-performance/forecasting:approve",
  reject: "enterprise-performance/forecasting:reject",
  cancel: "enterprise-performance/forecasting:cancel",
  close: "enterprise-performance/forecasting:close",
  report: "enterprise-performance/forecasting:report",
} as const;

export type ForecastingPermission = (typeof permissions)[keyof typeof permissions];
