export const permissions = {
  read: "master-data/items:read",
  create: "master-data/items:create",
  update: "master-data/items:update",
  submit: "master-data/items:submit",
  approve: "master-data/items:approve",
  reject: "master-data/items:reject",
  cancel: "master-data/items:cancel",
  close: "master-data/items:close",
  report: "master-data/items:report",
} as const;

export type ItemsPermission = (typeof permissions)[keyof typeof permissions];
