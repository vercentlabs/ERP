export const permissions = {
  read: "logistics/shipments:read",
  create: "logistics/shipments:create",
  update: "logistics/shipments:update",
  submit: "logistics/shipments:submit",
  approve: "logistics/shipments:approve",
  reject: "logistics/shipments:reject",
  cancel: "logistics/shipments:cancel",
  close: "logistics/shipments:close",
  report: "logistics/shipments:report",
} as const;

export type ShipmentsPermission = (typeof permissions)[keyof typeof permissions];
