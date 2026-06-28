export const permissions = {
  read: "crm/contacts:read",
  create: "crm/contacts:create",
  update: "crm/contacts:update",
  submit: "crm/contacts:submit",
  approve: "crm/contacts:approve",
  reject: "crm/contacts:reject",
  cancel: "crm/contacts:cancel",
  close: "crm/contacts:close",
  report: "crm/contacts:report",
} as const;

export type ContactsPermission = (typeof permissions)[keyof typeof permissions];
