export const permissions = {
  read: "finance/taxes:read",
  create: "finance/taxes:create",
  update: "finance/taxes:update",
  submit: "finance/taxes:submit",
  approve: "finance/taxes:approve",
  reject: "finance/taxes:reject",
  cancel: "finance/taxes:cancel",
  close: "finance/taxes:close",
  report: "finance/taxes:report",
} as const;

export type TaxesPermission = (typeof permissions)[keyof typeof permissions];
