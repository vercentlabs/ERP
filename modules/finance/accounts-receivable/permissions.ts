export const permissions = {
  read: "finance/accounts-receivable:read",
  create: "finance/accounts-receivable:create",
  update: "finance/accounts-receivable:update",
  submit: "finance/accounts-receivable:submit",
  approve: "finance/accounts-receivable:approve",
  reject: "finance/accounts-receivable:reject",
  cancel: "finance/accounts-receivable:cancel",
  close: "finance/accounts-receivable:close",
  report: "finance/accounts-receivable:report",
} as const;

export type AccountsReceivablePermission = (typeof permissions)[keyof typeof permissions];
