export const permissions = {
  read: "master-data/data-quality:read",
  create: "master-data/data-quality:create",
  update: "master-data/data-quality:update",
  submit: "master-data/data-quality:submit",
  approve: "master-data/data-quality:approve",
  reject: "master-data/data-quality:reject",
  cancel: "master-data/data-quality:cancel",
  close: "master-data/data-quality:close",
  report: "master-data/data-quality:report",
} as const;

export type DataQualityPermission = (typeof permissions)[keyof typeof permissions];
