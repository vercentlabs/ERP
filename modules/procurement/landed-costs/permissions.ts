export const permissions = {
  read: "procurement/landed-costs:read",
  create: "procurement/landed-costs:create",
  update: "procurement/landed-costs:update",
  submit: "procurement/landed-costs:submit",
  approve: "procurement/landed-costs:approve",
  reject: "procurement/landed-costs:reject",
  cancel: "procurement/landed-costs:cancel",
  close: "procurement/landed-costs:close",
  report: "procurement/landed-costs:report",
} as const;

export type LandedCostsPermission = (typeof permissions)[keyof typeof permissions];
