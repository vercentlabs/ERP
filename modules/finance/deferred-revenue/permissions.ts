export const permissions = {
  read: "finance/deferred-revenue:read",
  create: "finance/deferred-revenue:create",
  update: "finance/deferred-revenue:update",
  submit: "finance/deferred-revenue:submit",
  approve: "finance/deferred-revenue:approve",
  reject: "finance/deferred-revenue:reject",
  cancel: "finance/deferred-revenue:cancel",
  close: "finance/deferred-revenue:close",
  report: "finance/deferred-revenue:report",
} as const;

export type DeferredRevenuePermission = (typeof permissions)[keyof typeof permissions];
