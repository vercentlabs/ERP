export const permissions = {
  read: "finance/cost-centers:read",
  create: "finance/cost-centers:create",
  update: "finance/cost-centers:update",
  submit: "finance/cost-centers:submit",
  approve: "finance/cost-centers:approve",
  reject: "finance/cost-centers:reject",
  cancel: "finance/cost-centers:cancel",
  close: "finance/cost-centers:close",
  report: "finance/cost-centers:report",
} as const;

export type CostCentersPermission = (typeof permissions)[keyof typeof permissions];
