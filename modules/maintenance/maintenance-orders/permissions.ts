export const permissions = {
  read: "maintenance/maintenance-orders:read",
  create: "maintenance/maintenance-orders:create",
  update: "maintenance/maintenance-orders:update",
  submit: "maintenance/maintenance-orders:submit",
  approve: "maintenance/maintenance-orders:approve",
  reject: "maintenance/maintenance-orders:reject",
  cancel: "maintenance/maintenance-orders:cancel",
  close: "maintenance/maintenance-orders:close",
  report: "maintenance/maintenance-orders:report",
} as const;

export type MaintenanceOrdersPermission = (typeof permissions)[keyof typeof permissions];
