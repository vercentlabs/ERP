export const permissions = {
  read: "finance/fiscal-years:read",
  create: "finance/fiscal-years:create",
  update: "finance/fiscal-years:update",
  submit: "finance/fiscal-years:submit",
  approve: "finance/fiscal-years:approve",
  reject: "finance/fiscal-years:reject",
  cancel: "finance/fiscal-years:cancel",
  close: "finance/fiscal-years:close",
  report: "finance/fiscal-years:report",
} as const;

export type FiscalYearsPermission = (typeof permissions)[keyof typeof permissions];
