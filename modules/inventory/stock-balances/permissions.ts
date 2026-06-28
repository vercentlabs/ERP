export const permissions = {
  read: "inventory/stock-balances:read",
  create: "inventory/stock-balances:create",
  update: "inventory/stock-balances:update",
  submit: "inventory/stock-balances:submit",
  approve: "inventory/stock-balances:approve",
  reject: "inventory/stock-balances:reject",
  cancel: "inventory/stock-balances:cancel",
  close: "inventory/stock-balances:close",
  report: "inventory/stock-balances:report",
} as const;

export type StockBalancesPermission = (typeof permissions)[keyof typeof permissions];
