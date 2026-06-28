export const permissions = {
  read: "platform/documents:read",
  create: "platform/documents:create",
  update: "platform/documents:update",
  submit: "platform/documents:submit",
  approve: "platform/documents:approve",
  reject: "platform/documents:reject",
  cancel: "platform/documents:cancel",
  close: "platform/documents:close",
  report: "platform/documents:report",
} as const;

export type DocumentsPermission = (typeof permissions)[keyof typeof permissions];
