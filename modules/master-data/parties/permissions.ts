export const permissions = {
  read: "master-data/parties:read",
  create: "master-data/parties:create",
  update: "master-data/parties:update",
  submit: "master-data/parties:submit",
  approve: "master-data/parties:approve",
  reject: "master-data/parties:reject",
  cancel: "master-data/parties:cancel",
  close: "master-data/parties:close",
  report: "master-data/parties:report",
} as const;

export type PartiesPermission = (typeof permissions)[keyof typeof permissions];
