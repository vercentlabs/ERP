export const permissions = {
  read: "enterprise-performance/budgeting:read",
  create: "enterprise-performance/budgeting:create",
  update: "enterprise-performance/budgeting:update",
  submit: "enterprise-performance/budgeting:submit",
  approve: "enterprise-performance/budgeting:approve",
  reject: "enterprise-performance/budgeting:reject",
  cancel: "enterprise-performance/budgeting:cancel",
  close: "enterprise-performance/budgeting:close",
  report: "enterprise-performance/budgeting:report",
} as const;

export type BudgetingPermission = (typeof permissions)[keyof typeof permissions];
