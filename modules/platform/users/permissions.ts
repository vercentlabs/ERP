export const permissions = {
  read: "platform/users:read",
  create: "platform/users:create",
  update: "platform/users:update",
  submit: "platform/users:submit",
  approve: "platform/users:approve",
  reject: "platform/users:reject",
  cancel: "platform/users:cancel",
  close: "platform/users:close",
  report: "platform/users:report",
} as const;

export type UsersPermission = (typeof permissions)[keyof typeof permissions];
