export const permissions = {
  read: "master-data/employees:read",
  create: "master-data/employees:create",
  update: "master-data/employees:update",
  submit: "master-data/employees:submit",
  approve: "master-data/employees:approve",
  reject: "master-data/employees:reject",
  cancel: "master-data/employees:cancel",
  close: "master-data/employees:close",
  report: "master-data/employees:report",
} as const;

export type EmployeesPermission = (typeof permissions)[keyof typeof permissions];
