export const permissions = {
  read: "platform/teams:read",
  create: "platform/teams:create",
  update: "platform/teams:update",
  submit: "platform/teams:submit",
  approve: "platform/teams:approve",
  reject: "platform/teams:reject",
  cancel: "platform/teams:cancel",
  close: "platform/teams:close",
  report: "platform/teams:report",
} as const;

export type TeamsPermission = (typeof permissions)[keyof typeof permissions];
