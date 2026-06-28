export const permissions = {
  read: "commerce/carts:read",
  create: "commerce/carts:create",
  update: "commerce/carts:update",
  submit: "commerce/carts:submit",
  approve: "commerce/carts:approve",
  reject: "commerce/carts:reject",
  cancel: "commerce/carts:cancel",
  close: "commerce/carts:close",
  report: "commerce/carts:report",
} as const;

export type CartsPermission = (typeof permissions)[keyof typeof permissions];
