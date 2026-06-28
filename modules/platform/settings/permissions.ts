export const permissions = {
  read: "platform/settings:read",
  create: "platform/settings:create",
  update: "platform/settings:update",
  submit: "platform/settings:submit",
  approve: "platform/settings:approve",
  reject: "platform/settings:reject",
  cancel: "platform/settings:cancel",
  close: "platform/settings:close",
  report: "platform/settings:report",
} as const;

export type SettingsPermission = (typeof permissions)[keyof typeof permissions];
