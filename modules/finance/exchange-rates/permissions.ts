export const permissions = {
  read: "finance/exchange-rates:read",
  create: "finance/exchange-rates:create",
  update: "finance/exchange-rates:update",
  submit: "finance/exchange-rates:submit",
  approve: "finance/exchange-rates:approve",
  reject: "finance/exchange-rates:reject",
  cancel: "finance/exchange-rates:cancel",
  close: "finance/exchange-rates:close",
  report: "finance/exchange-rates:report",
} as const;

export type ExchangeRatesPermission = (typeof permissions)[keyof typeof permissions];
