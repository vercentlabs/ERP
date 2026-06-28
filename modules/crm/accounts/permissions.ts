export const permissions = {
  read: "crm/accounts:read",
  create: "crm/accounts:create",
  update: "crm/accounts:update",
  submit: "crm/accounts:submit",
  approve: "crm/accounts:approve",
  reject: "crm/accounts:reject",
  cancel: "crm/accounts:cancel",
  close: "crm/accounts:close",
  report: "crm/accounts:report",
} as const;

export type AccountsPermission = (typeof permissions)[keyof typeof permissions];
