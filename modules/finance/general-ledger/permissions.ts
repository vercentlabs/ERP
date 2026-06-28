export const permissions = {
  read: "finance/general-ledger:read",
  create: "finance/general-ledger:create",
  update: "finance/general-ledger:update",
  submit: "finance/general-ledger:submit",
  approve: "finance/general-ledger:approve",
  reject: "finance/general-ledger:reject",
  cancel: "finance/general-ledger:cancel",
  close: "finance/general-ledger:close",
  report: "finance/general-ledger:report",
} as const;

export type GeneralLedgerPermission = (typeof permissions)[keyof typeof permissions];
