export const permissions = {
  read: "finance/payments:read",
  create: "finance/payments:create",
  update: "finance/payments:update",
  submit: "finance/payments:submit",
  approve: "finance/payments:approve",
  reject: "finance/payments:reject",
  cancel: "finance/payments:cancel",
  close: "finance/payments:close",
  report: "finance/payments:report",
} as const;

export type PaymentsPermission = (typeof permissions)[keyof typeof permissions];
