export const permissions = {
  read: "crm/customers:read",
  create: "crm/customers:create",
  update: "crm/customers:update",
  submit: "crm/customers:submit",
  approve: "crm/customers:approve",
  reject: "crm/customers:reject",
  cancel: "crm/customers:cancel",
  close: "crm/customers:close",
  report: "crm/customers:report",
} as const;

export type CustomersPermission = (typeof permissions)[keyof typeof permissions];
