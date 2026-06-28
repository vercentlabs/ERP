export const permissions = {
  read: "hr/employee-documents:read",
  create: "hr/employee-documents:create",
  update: "hr/employee-documents:update",
  submit: "hr/employee-documents:submit",
  approve: "hr/employee-documents:approve",
  reject: "hr/employee-documents:reject",
  cancel: "hr/employee-documents:cancel",
  close: "hr/employee-documents:close",
  report: "hr/employee-documents:report",
} as const;

export type EmployeeDocumentsPermission = (typeof permissions)[keyof typeof permissions];
