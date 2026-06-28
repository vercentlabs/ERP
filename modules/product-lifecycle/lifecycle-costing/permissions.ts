export const permissions = {
  read: "product-lifecycle/lifecycle-costing:read",
  create: "product-lifecycle/lifecycle-costing:create",
  update: "product-lifecycle/lifecycle-costing:update",
  submit: "product-lifecycle/lifecycle-costing:submit",
  approve: "product-lifecycle/lifecycle-costing:approve",
  reject: "product-lifecycle/lifecycle-costing:reject",
  cancel: "product-lifecycle/lifecycle-costing:cancel",
  close: "product-lifecycle/lifecycle-costing:close",
  report: "product-lifecycle/lifecycle-costing:report",
} as const;

export type LifecycleCostingPermission = (typeof permissions)[keyof typeof permissions];
