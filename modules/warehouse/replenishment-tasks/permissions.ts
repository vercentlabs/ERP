export const permissions = {
  read: "warehouse/replenishment-tasks:read",
  create: "warehouse/replenishment-tasks:create",
  update: "warehouse/replenishment-tasks:update",
  submit: "warehouse/replenishment-tasks:submit",
  approve: "warehouse/replenishment-tasks:approve",
  reject: "warehouse/replenishment-tasks:reject",
  cancel: "warehouse/replenishment-tasks:cancel",
  close: "warehouse/replenishment-tasks:close",
  report: "warehouse/replenishment-tasks:report",
} as const;

export type ReplenishmentTasksPermission = (typeof permissions)[keyof typeof permissions];
