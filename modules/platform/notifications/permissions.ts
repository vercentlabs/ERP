export const permissions = {
  read: "platform/notifications:read",
  create: "platform/notifications:create",
  update: "platform/notifications:update",
  submit: "platform/notifications:submit",
  approve: "platform/notifications:approve",
  reject: "platform/notifications:reject",
  cancel: "platform/notifications:cancel",
  close: "platform/notifications:close",
  report: "platform/notifications:report",
} as const;

export type NotificationsPermission = (typeof permissions)[keyof typeof permissions];
