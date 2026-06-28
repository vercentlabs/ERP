export const permissions = {
  read: "master-data/currency-master:read",
  create: "master-data/currency-master:create",
  update: "master-data/currency-master:update",
  submit: "master-data/currency-master:submit",
  approve: "master-data/currency-master:approve",
  reject: "master-data/currency-master:reject",
  cancel: "master-data/currency-master:cancel",
  close: "master-data/currency-master:close",
  report: "master-data/currency-master:report",
} as const;

export type CurrencyMasterPermission = (typeof permissions)[keyof typeof permissions];
