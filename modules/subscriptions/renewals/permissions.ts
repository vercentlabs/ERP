export const permissions = {
  read: "subscriptions/renewals:read",
  create: "subscriptions/renewals:create",
  update: "subscriptions/renewals:update",
  submit: "subscriptions/renewals:submit",
  approve: "subscriptions/renewals:approve",
  reject: "subscriptions/renewals:reject",
  cancel: "subscriptions/renewals:cancel",
  close: "subscriptions/renewals:close",
  report: "subscriptions/renewals:report",
} as const;

export type RenewalsPermission = (typeof permissions)[keyof typeof permissions];
