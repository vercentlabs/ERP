export const permissions = {
  read: "master-data/locations:read",
  create: "master-data/locations:create",
  update: "master-data/locations:update",
  submit: "master-data/locations:submit",
  approve: "master-data/locations:approve",
  reject: "master-data/locations:reject",
  cancel: "master-data/locations:cancel",
  close: "master-data/locations:close",
  report: "master-data/locations:report",
} as const;

export type LocationsPermission = (typeof permissions)[keyof typeof permissions];
