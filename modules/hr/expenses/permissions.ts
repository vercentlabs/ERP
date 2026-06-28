export const permissions = {
  read: "hr/expenses:read",
  create: "hr/expenses:create",
  update: "hr/expenses:update",
  submit: "hr/expenses:submit",
  approve: "hr/expenses:approve",
  reject: "hr/expenses:reject",
  cancel: "hr/expenses:cancel",
  close: "hr/expenses:close",
  report: "hr/expenses:report",
} as const;

export type ExpensesPermission = (typeof permissions)[keyof typeof permissions];
