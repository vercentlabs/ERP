export const permissions = {
  read: "finance/bank-accounts:read",
  create: "finance/bank-accounts:create",
  update: "finance/bank-accounts:update",
  submit: "finance/bank-accounts:submit",
  approve: "finance/bank-accounts:approve",
  reject: "finance/bank-accounts:reject",
  cancel: "finance/bank-accounts:cancel",
  close: "finance/bank-accounts:close",
  report: "finance/bank-accounts:report",
} as const;

export type BankAccountsPermission = (typeof permissions)[keyof typeof permissions];
