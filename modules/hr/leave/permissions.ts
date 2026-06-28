export const permissions = {
  read: "hr/leave:read",
  create: "hr/leave:create",
  update: "hr/leave:update",
  submit: "hr/leave:submit",
  approve: "hr/leave:approve",
  reject: "hr/leave:reject",
  cancel: "hr/leave:cancel",
  close: "hr/leave:close",
  report: "hr/leave:report",
} as const;

export type LeavePermission = (typeof permissions)[keyof typeof permissions];
