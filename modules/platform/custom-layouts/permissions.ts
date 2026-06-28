export const permissions = {
  read: "platform/custom-layouts:read",
  create: "platform/custom-layouts:create",
  update: "platform/custom-layouts:update",
  submit: "platform/custom-layouts:submit",
  approve: "platform/custom-layouts:approve",
  reject: "platform/custom-layouts:reject",
  cancel: "platform/custom-layouts:cancel",
  close: "platform/custom-layouts:close",
  report: "platform/custom-layouts:report",
} as const;

export type CustomLayoutsPermission = (typeof permissions)[keyof typeof permissions];
