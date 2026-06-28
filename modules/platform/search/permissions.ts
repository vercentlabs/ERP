export const permissions = {
  read: "platform/search:read",
  create: "platform/search:create",
  update: "platform/search:update",
  submit: "platform/search:submit",
  approve: "platform/search:approve",
  reject: "platform/search:reject",
  cancel: "platform/search:cancel",
  close: "platform/search:close",
  report: "platform/search:report",
} as const;

export type SearchPermission = (typeof permissions)[keyof typeof permissions];
