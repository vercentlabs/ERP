export const permissions = {
  read: "procurement/purchase-contracts:read",
  create: "procurement/purchase-contracts:create",
  update: "procurement/purchase-contracts:update",
  submit: "procurement/purchase-contracts:submit",
  approve: "procurement/purchase-contracts:approve",
  reject: "procurement/purchase-contracts:reject",
  cancel: "procurement/purchase-contracts:cancel",
  close: "procurement/purchase-contracts:close",
  report: "procurement/purchase-contracts:report",
} as const;

export type PurchaseContractsPermission = (typeof permissions)[keyof typeof permissions];
