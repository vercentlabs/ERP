export const permissions = {
  read: "inventory/stock-adjustments:read",
  create: "inventory/stock-adjustments:create",
  update: "inventory/stock-adjustments:update",
  submit: "inventory/stock-adjustments:submit",
  approve: "inventory/stock-adjustments:approve",
  reject: "inventory/stock-adjustments:reject",
  cancel: "inventory/stock-adjustments:cancel",
  close: "inventory/stock-adjustments:close",
  report: "inventory/stock-adjustments:report",
} as const;

export type StockAdjustmentsPermission = (typeof permissions)[keyof typeof permissions];
