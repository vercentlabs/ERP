export const permissions = {
  read: "finance/bank-reconciliation:read",
  create: "finance/bank-reconciliation:create",
  update: "finance/bank-reconciliation:update",
  submit: "finance/bank-reconciliation:submit",
  approve: "finance/bank-reconciliation:approve",
  reject: "finance/bank-reconciliation:reject",
  cancel: "finance/bank-reconciliation:cancel",
  close: "finance/bank-reconciliation:close",
  report: "finance/bank-reconciliation:report",
} as const;

export type BankReconciliationPermission = (typeof permissions)[keyof typeof permissions];
