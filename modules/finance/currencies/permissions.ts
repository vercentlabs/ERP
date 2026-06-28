export const permissions = {
  read: "finance/currencies:read",
  create: "finance/currencies:create",
  update: "finance/currencies:update",
  submit: "finance/currencies:submit",
  approve: "finance/currencies:approve",
  reject: "finance/currencies:reject",
  cancel: "finance/currencies:cancel",
  close: "finance/currencies:close",
  report: "finance/currencies:report",
} as const;

export type CurrenciesPermission = (typeof permissions)[keyof typeof permissions];
