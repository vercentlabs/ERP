export const permissions = {
  read: "finance/cash-flow:read",
  create: "finance/cash-flow:create",
  update: "finance/cash-flow:update",
  submit: "finance/cash-flow:submit",
  approve: "finance/cash-flow:approve",
  reject: "finance/cash-flow:reject",
  cancel: "finance/cash-flow:cancel",
  close: "finance/cash-flow:close",
  report: "finance/cash-flow:report",
} as const;

export type CashFlowPermission = (typeof permissions)[keyof typeof permissions];
