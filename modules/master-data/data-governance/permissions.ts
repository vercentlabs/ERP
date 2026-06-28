export const permissions = {
  read: "master-data/data-governance:read",
  create: "master-data/data-governance:create",
  update: "master-data/data-governance:update",
  submit: "master-data/data-governance:submit",
  approve: "master-data/data-governance:approve",
  reject: "master-data/data-governance:reject",
  cancel: "master-data/data-governance:cancel",
  close: "master-data/data-governance:close",
  report: "master-data/data-governance:report",
} as const;

export type DataGovernancePermission = (typeof permissions)[keyof typeof permissions];
