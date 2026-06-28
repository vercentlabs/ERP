export const permissions = {
  read: "product-lifecycle/variants:read",
  create: "product-lifecycle/variants:create",
  update: "product-lifecycle/variants:update",
  submit: "product-lifecycle/variants:submit",
  approve: "product-lifecycle/variants:approve",
  reject: "product-lifecycle/variants:reject",
  cancel: "product-lifecycle/variants:cancel",
  close: "product-lifecycle/variants:close",
  report: "product-lifecycle/variants:report",
} as const;

export type VariantsPermission = (typeof permissions)[keyof typeof permissions];
