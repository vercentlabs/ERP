export const permissions = {
  read: "helpdesk/slas:read",
  create: "helpdesk/slas:create",
  update: "helpdesk/slas:update",
  submit: "helpdesk/slas:submit",
  approve: "helpdesk/slas:approve",
  reject: "helpdesk/slas:reject",
  cancel: "helpdesk/slas:cancel",
  close: "helpdesk/slas:close",
  report: "helpdesk/slas:report",
} as const;

export type SlasPermission = (typeof permissions)[keyof typeof permissions];
