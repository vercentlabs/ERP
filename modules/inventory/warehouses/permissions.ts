export const permissions = {
  read: "inventory/warehouses:read",
  create: "inventory/warehouses:create",
  update: "inventory/warehouses:update",
  submit: "inventory/warehouses:submit",
  approve: "inventory/warehouses:approve",
  reject: "inventory/warehouses:reject",
  cancel: "inventory/warehouses:cancel",
  close: "inventory/warehouses:close",
  report: "inventory/warehouses:report",
} as const;

export type WarehousesPermission = (typeof permissions)[keyof typeof permissions];
