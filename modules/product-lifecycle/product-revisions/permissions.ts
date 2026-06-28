export const permissions = {
  read: "product-lifecycle/product-revisions:read",
  create: "product-lifecycle/product-revisions:create",
  update: "product-lifecycle/product-revisions:update",
  submit: "product-lifecycle/product-revisions:submit",
  approve: "product-lifecycle/product-revisions:approve",
  reject: "product-lifecycle/product-revisions:reject",
  cancel: "product-lifecycle/product-revisions:cancel",
  close: "product-lifecycle/product-revisions:close",
  report: "product-lifecycle/product-revisions:report",
} as const;

export type ProductRevisionsPermission = (typeof permissions)[keyof typeof permissions];
