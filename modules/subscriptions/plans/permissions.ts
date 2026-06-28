export const permissions = {
  read: "subscriptions/plans:read",
  create: "subscriptions/plans:create",
  update: "subscriptions/plans:update",
  submit: "subscriptions/plans:submit",
  approve: "subscriptions/plans:approve",
  reject: "subscriptions/plans:reject",
  cancel: "subscriptions/plans:cancel",
  close: "subscriptions/plans:close",
  report: "subscriptions/plans:report",
} as const;

export type PlansPermission = (typeof permissions)[keyof typeof permissions];
