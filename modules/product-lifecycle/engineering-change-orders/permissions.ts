export const permissions = {
  read: "product-lifecycle/engineering-change-orders:read",
  create: "product-lifecycle/engineering-change-orders:create",
  update: "product-lifecycle/engineering-change-orders:update",
  submit: "product-lifecycle/engineering-change-orders:submit",
  approve: "product-lifecycle/engineering-change-orders:approve",
  reject: "product-lifecycle/engineering-change-orders:reject",
  cancel: "product-lifecycle/engineering-change-orders:cancel",
  close: "product-lifecycle/engineering-change-orders:close",
  report: "product-lifecycle/engineering-change-orders:report",
} as const;

export type EngineeringChangeOrdersPermission = (typeof permissions)[keyof typeof permissions];
