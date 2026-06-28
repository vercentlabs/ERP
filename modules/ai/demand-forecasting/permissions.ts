export const permissions = {
  read: "ai/demand-forecasting:read",
  create: "ai/demand-forecasting:create",
  update: "ai/demand-forecasting:update",
  submit: "ai/demand-forecasting:submit",
  approve: "ai/demand-forecasting:approve",
  reject: "ai/demand-forecasting:reject",
  cancel: "ai/demand-forecasting:cancel",
  close: "ai/demand-forecasting:close",
  report: "ai/demand-forecasting:report",
} as const;

export type DemandForecastingPermission = (typeof permissions)[keyof typeof permissions];
