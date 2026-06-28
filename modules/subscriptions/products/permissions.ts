export const permissions = {
  read: "subscriptions/products:read",
  create: "subscriptions/products:create",
  update: "subscriptions/products:update",
  submit: "subscriptions/products:submit",
  approve: "subscriptions/products:approve",
  reject: "subscriptions/products:reject",
  cancel: "subscriptions/products:cancel",
  close: "subscriptions/products:close",
  report: "subscriptions/products:report",
} as const;

export type ProductsPermission = (typeof permissions)[keyof typeof permissions];
