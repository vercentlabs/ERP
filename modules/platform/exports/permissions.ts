export const permissions = {
  read: "platform/exports:read",
  create: "platform/exports:create",
  update: "platform/exports:update",
  submit: "platform/exports:submit",
  approve: "platform/exports:approve",
  reject: "platform/exports:reject",
  cancel: "platform/exports:cancel",
  close: "platform/exports:close",
  report: "platform/exports:report",
} as const;

export type ExportsPermission = (typeof permissions)[keyof typeof permissions];
