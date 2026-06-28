export const permissions = {
  read: "procurement/goods-receipts:read",
  create: "procurement/goods-receipts:create",
  update: "procurement/goods-receipts:update",
  submit: "procurement/goods-receipts:submit",
  approve: "procurement/goods-receipts:approve",
  reject: "procurement/goods-receipts:reject",
  cancel: "procurement/goods-receipts:cancel",
  close: "procurement/goods-receipts:close",
  report: "procurement/goods-receipts:report",
} as const;

export type GoodsReceiptsPermission = (typeof permissions)[keyof typeof permissions];
