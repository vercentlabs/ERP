export const permissions = {
  read: "master-data/tax-master:read",
  create: "master-data/tax-master:create",
  update: "master-data/tax-master:update",
  submit: "master-data/tax-master:submit",
  approve: "master-data/tax-master:approve",
  reject: "master-data/tax-master:reject",
  cancel: "master-data/tax-master:cancel",
  close: "master-data/tax-master:close",
  report: "master-data/tax-master:report",
} as const;

export type TaxMasterPermission = (typeof permissions)[keyof typeof permissions];
