export const permissions = {
  read: "platform/branches:read",
  create: "platform/branches:create",
  update: "platform/branches:update",
  submit: "platform/branches:submit",
  approve: "platform/branches:approve",
  reject: "platform/branches:reject",
  cancel: "platform/branches:cancel",
  close: "platform/branches:close",
  report: "platform/branches:report",
} as const;

export type BranchesPermission = (typeof permissions)[keyof typeof permissions];
