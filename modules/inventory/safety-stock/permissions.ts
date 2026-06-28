export const permissions = {
  read: "inventory/safety-stock:read",
  create: "inventory/safety-stock:create",
  update: "inventory/safety-stock:update",
  submit: "inventory/safety-stock:submit",
  approve: "inventory/safety-stock:approve",
  reject: "inventory/safety-stock:reject",
  cancel: "inventory/safety-stock:cancel",
  close: "inventory/safety-stock:close",
  report: "inventory/safety-stock:report",
} as const;

export type SafetyStockPermission = (typeof permissions)[keyof typeof permissions];
