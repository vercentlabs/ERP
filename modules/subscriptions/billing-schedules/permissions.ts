export const permissions = {
  read: "subscriptions/billing-schedules:read",
  create: "subscriptions/billing-schedules:create",
  update: "subscriptions/billing-schedules:update",
  submit: "subscriptions/billing-schedules:submit",
  approve: "subscriptions/billing-schedules:approve",
  reject: "subscriptions/billing-schedules:reject",
  cancel: "subscriptions/billing-schedules:cancel",
  close: "subscriptions/billing-schedules:close",
  report: "subscriptions/billing-schedules:report",
} as const;

export type BillingSchedulesPermission = (typeof permissions)[keyof typeof permissions];
