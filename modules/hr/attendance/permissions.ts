export const permissions = {
  read: "hr/attendance:read",
  create: "hr/attendance:create",
  update: "hr/attendance:update",
  submit: "hr/attendance:submit",
  approve: "hr/attendance:approve",
  reject: "hr/attendance:reject",
  cancel: "hr/attendance:cancel",
  close: "hr/attendance:close",
  report: "hr/attendance:report",
} as const;

export type AttendancePermission = (typeof permissions)[keyof typeof permissions];
