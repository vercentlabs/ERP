export const permissions = {
  read: "hr/employees:read",
  create: "hr/employees:create",
  update: "hr/employees:update",
  submit: "hr/employees:submit",
  approve: "hr/employees:approve",
  reject: "hr/employees:reject",
  cancel: "hr/employees:cancel",
  close: "hr/employees:close",
  report: "hr/employees:report",
} as const;

export type EmployeesPermission = (typeof permissions)[keyof typeof permissions];
