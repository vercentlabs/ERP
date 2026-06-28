export const permissions = {
  read: "helpdesk/returns-repairs:read",
  create: "helpdesk/returns-repairs:create",
  update: "helpdesk/returns-repairs:update",
  submit: "helpdesk/returns-repairs:submit",
  approve: "helpdesk/returns-repairs:approve",
  reject: "helpdesk/returns-repairs:reject",
  cancel: "helpdesk/returns-repairs:cancel",
  close: "helpdesk/returns-repairs:close",
  report: "helpdesk/returns-repairs:report",
} as const;

export type ReturnsRepairsPermission = (typeof permissions)[keyof typeof permissions];
