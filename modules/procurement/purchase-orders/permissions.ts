export const permissions = {
  read: "procurement/purchase-orders:read",
  create: "procurement/purchase-orders:create",
  update: "procurement/purchase-orders:update",
  submit: "procurement/purchase-orders:submit",
  approve: "procurement/purchase-orders:approve",
  reject: "procurement/purchase-orders:reject",
  cancel: "procurement/purchase-orders:cancel",
  close: "procurement/purchase-orders:close",
  report: "procurement/purchase-orders:report",
} as const;

export type PurchaseOrdersPermission = (typeof permissions)[keyof typeof permissions];
