export const permissions = {
  read: "finance/budgets:read",
  create: "finance/budgets:create",
  update: "finance/budgets:update",
  submit: "finance/budgets:submit",
  approve: "finance/budgets:approve",
  reject: "finance/budgets:reject",
  cancel: "finance/budgets:cancel",
  close: "finance/budgets:close",
  report: "finance/budgets:report",
} as const;

export type BudgetsPermission = (typeof permissions)[keyof typeof permissions];
