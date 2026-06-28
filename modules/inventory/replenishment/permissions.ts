export const permissions = {
  read: "inventory/replenishment:read",
  create: "inventory/replenishment:create",
  update: "inventory/replenishment:update",
  submit: "inventory/replenishment:submit",
  approve: "inventory/replenishment:approve",
  reject: "inventory/replenishment:reject",
  cancel: "inventory/replenishment:cancel",
  close: "inventory/replenishment:close",
  report: "inventory/replenishment:report",
} as const;

export type ReplenishmentPermission = (typeof permissions)[keyof typeof permissions];
