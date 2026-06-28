export const permissions = {
  read: "crm/customer-360:read",
  create: "crm/customer-360:create",
  update: "crm/customer-360:update",
  submit: "crm/customer-360:submit",
  approve: "crm/customer-360:approve",
  reject: "crm/customer-360:reject",
  cancel: "crm/customer-360:cancel",
  close: "crm/customer-360:close",
  report: "crm/customer-360:report",
} as const;

export type Customer360Permission = (typeof permissions)[keyof typeof permissions];
