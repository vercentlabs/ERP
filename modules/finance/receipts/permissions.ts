export const permissions = {
  read: "finance/receipts:read",
  create: "finance/receipts:create",
  update: "finance/receipts:update",
  submit: "finance/receipts:submit",
  approve: "finance/receipts:approve",
  reject: "finance/receipts:reject",
  cancel: "finance/receipts:cancel",
  close: "finance/receipts:close",
  report: "finance/receipts:report",
} as const;

export type ReceiptsPermission = (typeof permissions)[keyof typeof permissions];
