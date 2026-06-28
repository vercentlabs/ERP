export const permissions = {
  read: "inventory/demand-planning:read",
  create: "inventory/demand-planning:create",
  update: "inventory/demand-planning:update",
  submit: "inventory/demand-planning:submit",
  approve: "inventory/demand-planning:approve",
  reject: "inventory/demand-planning:reject",
  cancel: "inventory/demand-planning:cancel",
  close: "inventory/demand-planning:close",
  report: "inventory/demand-planning:report",
} as const;

export type DemandPlanningPermission = (typeof permissions)[keyof typeof permissions];
