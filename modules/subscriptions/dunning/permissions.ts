export const permissions = {
  read: "subscriptions/dunning:read",
  create: "subscriptions/dunning:create",
  update: "subscriptions/dunning:update",
  submit: "subscriptions/dunning:submit",
  approve: "subscriptions/dunning:approve",
  reject: "subscriptions/dunning:reject",
  cancel: "subscriptions/dunning:cancel",
  close: "subscriptions/dunning:close",
  report: "subscriptions/dunning:report",
} as const;

export type DunningPermission = (typeof permissions)[keyof typeof permissions];
