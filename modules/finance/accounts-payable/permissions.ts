export const permissions = {
  read: "finance/accounts-payable:read",
  create: "finance/accounts-payable:create",
  update: "finance/accounts-payable:update",
  submit: "finance/accounts-payable:submit",
  approve: "finance/accounts-payable:approve",
  reject: "finance/accounts-payable:reject",
  cancel: "finance/accounts-payable:cancel",
  close: "finance/accounts-payable:close",
  report: "finance/accounts-payable:report",
} as const;

export type AccountsPayablePermission = (typeof permissions)[keyof typeof permissions];
