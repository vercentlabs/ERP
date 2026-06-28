export const permissions = {
  read: "logistics/transport-costing:read",
  create: "logistics/transport-costing:create",
  update: "logistics/transport-costing:update",
  submit: "logistics/transport-costing:submit",
  approve: "logistics/transport-costing:approve",
  reject: "logistics/transport-costing:reject",
  cancel: "logistics/transport-costing:cancel",
  close: "logistics/transport-costing:close",
  report: "logistics/transport-costing:report",
} as const;

export type TransportCostingPermission = (typeof permissions)[keyof typeof permissions];
