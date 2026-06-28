export const permissions = {
  read: "hr/departments:read",
  create: "hr/departments:create",
  update: "hr/departments:update",
  submit: "hr/departments:submit",
  approve: "hr/departments:approve",
  reject: "hr/departments:reject",
  cancel: "hr/departments:cancel",
  close: "hr/departments:close",
  report: "hr/departments:report",
} as const;

export type DepartmentsPermission = (typeof permissions)[keyof typeof permissions];
