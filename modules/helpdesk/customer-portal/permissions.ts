export const permissions = {
  read: "helpdesk/customer-portal:read",
  create: "helpdesk/customer-portal:create",
  update: "helpdesk/customer-portal:update",
  submit: "helpdesk/customer-portal:submit",
  approve: "helpdesk/customer-portal:approve",
  reject: "helpdesk/customer-portal:reject",
  cancel: "helpdesk/customer-portal:cancel",
  close: "helpdesk/customer-portal:close",
  report: "helpdesk/customer-portal:report",
} as const;

export type CustomerPortalPermission = (typeof permissions)[keyof typeof permissions];
