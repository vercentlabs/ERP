export const permissions = {
  read: "platform/imports:read",
  create: "platform/imports:create",
  update: "platform/imports:update",
  submit: "platform/imports:submit",
  approve: "platform/imports:approve",
  reject: "platform/imports:reject",
  cancel: "platform/imports:cancel",
  close: "platform/imports:close",
  report: "platform/imports:report",
} as const;

export type ImportsPermission = (typeof permissions)[keyof typeof permissions];
