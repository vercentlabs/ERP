export const permissions = {
  read: "finance/journals:read",
  create: "finance/journals:create",
  update: "finance/journals:update",
  submit: "finance/journals:submit",
  approve: "finance/journals:approve",
  reject: "finance/journals:reject",
  cancel: "finance/journals:cancel",
  close: "finance/journals:close",
  report: "finance/journals:report",
} as const;

export type JournalsPermission = (typeof permissions)[keyof typeof permissions];
