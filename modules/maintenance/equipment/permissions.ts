export const permissions = {
  read: "maintenance/equipment:read",
  create: "maintenance/equipment:create",
  update: "maintenance/equipment:update",
  submit: "maintenance/equipment:submit",
  approve: "maintenance/equipment:approve",
  reject: "maintenance/equipment:reject",
  cancel: "maintenance/equipment:cancel",
  close: "maintenance/equipment:close",
  report: "maintenance/equipment:report",
} as const;

export type EquipmentPermission = (typeof permissions)[keyof typeof permissions];
