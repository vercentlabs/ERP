export const permissions = {
  read: "product-lifecycle/products:read",
  create: "product-lifecycle/products:create",
  update: "product-lifecycle/products:update",
  submit: "product-lifecycle/products:submit",
  approve: "product-lifecycle/products:approve",
  reject: "product-lifecycle/products:reject",
  cancel: "product-lifecycle/products:cancel",
  close: "product-lifecycle/products:close",
  report: "product-lifecycle/products:report",
} as const;

export type ProductsPermission = (typeof permissions)[keyof typeof permissions];
