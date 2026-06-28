export const permissions = {
  read: "procurement/supplier-scorecards:read",
  create: "procurement/supplier-scorecards:create",
  update: "procurement/supplier-scorecards:update",
  submit: "procurement/supplier-scorecards:submit",
  approve: "procurement/supplier-scorecards:approve",
  reject: "procurement/supplier-scorecards:reject",
  cancel: "procurement/supplier-scorecards:cancel",
  close: "procurement/supplier-scorecards:close",
  report: "procurement/supplier-scorecards:report",
} as const;

export type SupplierScorecardsPermission = (typeof permissions)[keyof typeof permissions];
