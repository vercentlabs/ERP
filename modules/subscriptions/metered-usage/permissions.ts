export const permissions = {
  read: "subscriptions/metered-usage:read",
  create: "subscriptions/metered-usage:create",
  update: "subscriptions/metered-usage:update",
  submit: "subscriptions/metered-usage:submit",
  approve: "subscriptions/metered-usage:approve",
  reject: "subscriptions/metered-usage:reject",
  cancel: "subscriptions/metered-usage:cancel",
  close: "subscriptions/metered-usage:close",
  report: "subscriptions/metered-usage:report",
} as const;

export type MeteredUsagePermission = (typeof permissions)[keyof typeof permissions];
