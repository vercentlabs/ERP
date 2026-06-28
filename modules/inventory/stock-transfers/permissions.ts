export const permissions = {
  read: "inventory/stock-transfers:read",
  create: "inventory/stock-transfers:create",
  update: "inventory/stock-transfers:update",
  submit: "inventory/stock-transfers:submit",
  approve: "inventory/stock-transfers:approve",
  reject: "inventory/stock-transfers:reject",
  cancel: "inventory/stock-transfers:cancel",
  close: "inventory/stock-transfers:close",
  report: "inventory/stock-transfers:report",
} as const;

export type StockTransfersPermission = (typeof permissions)[keyof typeof permissions];
