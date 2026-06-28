export const permissions = {
  read: "helpdesk/escalations:read",
  create: "helpdesk/escalations:create",
  update: "helpdesk/escalations:update",
  submit: "helpdesk/escalations:submit",
  approve: "helpdesk/escalations:approve",
  reject: "helpdesk/escalations:reject",
  cancel: "helpdesk/escalations:cancel",
  close: "helpdesk/escalations:close",
  report: "helpdesk/escalations:report",
} as const;

export type EscalationsPermission = (typeof permissions)[keyof typeof permissions];
