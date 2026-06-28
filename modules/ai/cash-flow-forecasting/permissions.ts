export const permissions = {
  read: "ai/cash-flow-forecasting:read",
  create: "ai/cash-flow-forecasting:create",
  update: "ai/cash-flow-forecasting:update",
  submit: "ai/cash-flow-forecasting:submit",
  approve: "ai/cash-flow-forecasting:approve",
  reject: "ai/cash-flow-forecasting:reject",
  cancel: "ai/cash-flow-forecasting:cancel",
  close: "ai/cash-flow-forecasting:close",
  report: "ai/cash-flow-forecasting:report",
} as const;

export type CashFlowForecastingPermission = (typeof permissions)[keyof typeof permissions];
