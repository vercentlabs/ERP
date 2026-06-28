export const permissions = {
  read: "finance/profit-centers:read",
  create: "finance/profit-centers:create",
  update: "finance/profit-centers:update",
  submit: "finance/profit-centers:submit",
  approve: "finance/profit-centers:approve",
  reject: "finance/profit-centers:reject",
  cancel: "finance/profit-centers:cancel",
  close: "finance/profit-centers:close",
  report: "finance/profit-centers:report",
} as const;

export type ProfitCentersPermission = (typeof permissions)[keyof typeof permissions];
