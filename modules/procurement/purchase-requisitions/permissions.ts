export const permissions = {
  read: "procurement/purchase-requisitions:read",
  create: "procurement/purchase-requisitions:create",
  update: "procurement/purchase-requisitions:update",
  submit: "procurement/purchase-requisitions:submit",
  approve: "procurement/purchase-requisitions:approve",
  reject: "procurement/purchase-requisitions:reject",
  cancel: "procurement/purchase-requisitions:cancel",
  close: "procurement/purchase-requisitions:close",
  report: "procurement/purchase-requisitions:report",
} as const;

export type PurchaseRequisitionsPermission = (typeof permissions)[keyof typeof permissions];
