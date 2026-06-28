export const permissions = {
  read: "hr/shifts:read",
  create: "hr/shifts:create",
  update: "hr/shifts:update",
  submit: "hr/shifts:submit",
  approve: "hr/shifts:approve",
  reject: "hr/shifts:reject",
  cancel: "hr/shifts:cancel",
  close: "hr/shifts:close",
  report: "hr/shifts:report",
} as const;

export type ShiftsPermission = (typeof permissions)[keyof typeof permissions];
