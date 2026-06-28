export const permissions = {
  read: "platform/localization:read",
  create: "platform/localization:create",
  update: "platform/localization:update",
  submit: "platform/localization:submit",
  approve: "platform/localization:approve",
  reject: "platform/localization:reject",
  cancel: "platform/localization:cancel",
  close: "platform/localization:close",
  report: "platform/localization:report",
} as const;

export type LocalizationPermission = (typeof permissions)[keyof typeof permissions];
