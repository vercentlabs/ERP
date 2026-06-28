export const permissions = {
  read: "platform/auth:read",
  create: "platform/auth:create",
  update: "platform/auth:update",
  submit: "platform/auth:submit",
  approve: "platform/auth:approve",
  reject: "platform/auth:reject",
  cancel: "platform/auth:cancel",
  close: "platform/auth:close",
  report: "platform/auth:report",
} as const;

export type AuthPermission = (typeof permissions)[keyof typeof permissions];
