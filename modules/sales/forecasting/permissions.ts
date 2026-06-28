export const permissions = {
  read: "sales/forecasting:read",
  create: "sales/forecasting:create",
  update: "sales/forecasting:update",
  submit: "sales/forecasting:submit",
  approve: "sales/forecasting:approve",
  reject: "sales/forecasting:reject",
  cancel: "sales/forecasting:cancel",
  close: "sales/forecasting:close",
  report: "sales/forecasting:report",
} as const;

export type ForecastingPermission = (typeof permissions)[keyof typeof permissions];
