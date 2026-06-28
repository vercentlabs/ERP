export const permissions = {
  read: "subscriptions/contracts:read",
  create: "subscriptions/contracts:create",
  update: "subscriptions/contracts:update",
  submit: "subscriptions/contracts:submit",
  approve: "subscriptions/contracts:approve",
  reject: "subscriptions/contracts:reject",
  cancel: "subscriptions/contracts:cancel",
  close: "subscriptions/contracts:close",
  report: "subscriptions/contracts:report",
} as const;

export type ContractsPermission = (typeof permissions)[keyof typeof permissions];
