export const permissions = {
  read: "procurement/purchase-returns:read",
  create: "procurement/purchase-returns:create",
  update: "procurement/purchase-returns:update",
  submit: "procurement/purchase-returns:submit",
  approve: "procurement/purchase-returns:approve",
  reject: "procurement/purchase-returns:reject",
  cancel: "procurement/purchase-returns:cancel",
  close: "procurement/purchase-returns:close",
  report: "procurement/purchase-returns:report",
} as const;

export type PurchaseReturnsPermission = (typeof permissions)[keyof typeof permissions];
