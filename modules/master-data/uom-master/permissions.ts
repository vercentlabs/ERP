export const permissions = {
  read: "master-data/uom-master:read",
  create: "master-data/uom-master:create",
  update: "master-data/uom-master:update",
  submit: "master-data/uom-master:submit",
  approve: "master-data/uom-master:approve",
  reject: "master-data/uom-master:reject",
  cancel: "master-data/uom-master:cancel",
  close: "master-data/uom-master:close",
  report: "master-data/uom-master:report",
} as const;

export type UomMasterPermission = (typeof permissions)[keyof typeof permissions];
