export const permissions = {
  read: "master-data/customers:read",
  create: "master-data/customers:create",
  update: "master-data/customers:update",
  submit: "master-data/customers:submit",
  approve: "master-data/customers:approve",
  reject: "master-data/customers:reject",
  cancel: "master-data/customers:cancel",
  close: "master-data/customers:close",
  report: "master-data/customers:report",
} as const;

export type CustomersPermission = (typeof permissions)[keyof typeof permissions];
