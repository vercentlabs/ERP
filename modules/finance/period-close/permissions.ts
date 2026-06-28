export const permissions = {
  read: "finance/period-close:read",
  create: "finance/period-close:create",
  update: "finance/period-close:update",
  submit: "finance/period-close:submit",
  approve: "finance/period-close:approve",
  reject: "finance/period-close:reject",
  cancel: "finance/period-close:cancel",
  close: "finance/period-close:close",
  report: "finance/period-close:report",
} as const;

export type PeriodClosePermission = (typeof permissions)[keyof typeof permissions];
