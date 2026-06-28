export const permissions = {
  read: "maintenance/assets:read",
  create: "maintenance/assets:create",
  update: "maintenance/assets:update",
  submit: "maintenance/assets:submit",
  approve: "maintenance/assets:approve",
  reject: "maintenance/assets:reject",
  cancel: "maintenance/assets:cancel",
  close: "maintenance/assets:close",
  report: "maintenance/assets:report",
} as const;

export type AssetsPermission = (typeof permissions)[keyof typeof permissions];
