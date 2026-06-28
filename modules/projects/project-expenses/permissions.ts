export const permissions = {
  read: "projects/project-expenses:read",
  create: "projects/project-expenses:create",
  update: "projects/project-expenses:update",
  submit: "projects/project-expenses:submit",
  approve: "projects/project-expenses:approve",
  reject: "projects/project-expenses:reject",
  cancel: "projects/project-expenses:cancel",
  close: "projects/project-expenses:close",
  report: "projects/project-expenses:report",
} as const;

export type ProjectExpensesPermission = (typeof permissions)[keyof typeof permissions];
