export const permissions = {
  read: "inventory/locations:read",
  create: "inventory/locations:create",
  update: "inventory/locations:update",
  submit: "inventory/locations:submit",
  approve: "inventory/locations:approve",
  reject: "inventory/locations:reject",
  cancel: "inventory/locations:cancel",
  close: "inventory/locations:close",
  report: "inventory/locations:report",
} as const;

export type LocationsPermission = (typeof permissions)[keyof typeof permissions];
