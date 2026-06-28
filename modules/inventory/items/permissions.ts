export const permissions = {
  read: "inventory/items:read",
  create: "inventory/items:create",
  update: "inventory/items:update",
  submit: "inventory/items:submit",
  approve: "inventory/items:approve",
  reject: "inventory/items:reject",
  cancel: "inventory/items:cancel",
  close: "inventory/items:close",
  report: "inventory/items:report",
} as const;

export type ItemsPermission = (typeof permissions)[keyof typeof permissions];
