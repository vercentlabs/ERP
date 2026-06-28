export const permissions = {
  read: "finance/sub-ledgers:read",
  create: "finance/sub-ledgers:create",
  update: "finance/sub-ledgers:update",
  submit: "finance/sub-ledgers:submit",
  approve: "finance/sub-ledgers:approve",
  reject: "finance/sub-ledgers:reject",
  cancel: "finance/sub-ledgers:cancel",
  close: "finance/sub-ledgers:close",
  report: "finance/sub-ledgers:report",
} as const;

export type SubLedgersPermission = (typeof permissions)[keyof typeof permissions];
