export const permissions = {
  read: "master-data/chart-master:read",
  create: "master-data/chart-master:create",
  update: "master-data/chart-master:update",
  submit: "master-data/chart-master:submit",
  approve: "master-data/chart-master:approve",
  reject: "master-data/chart-master:reject",
  cancel: "master-data/chart-master:cancel",
  close: "master-data/chart-master:close",
  report: "master-data/chart-master:report",
} as const;

export type ChartMasterPermission = (typeof permissions)[keyof typeof permissions];
