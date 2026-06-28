export const permissions = {
  read: "manufacturing/capacity-planning:read",
  create: "manufacturing/capacity-planning:create",
  update: "manufacturing/capacity-planning:update",
  submit: "manufacturing/capacity-planning:submit",
  approve: "manufacturing/capacity-planning:approve",
  reject: "manufacturing/capacity-planning:reject",
  cancel: "manufacturing/capacity-planning:cancel",
  close: "manufacturing/capacity-planning:close",
  report: "manufacturing/capacity-planning:report",
} as const;

export type CapacityPlanningPermission = (typeof permissions)[keyof typeof permissions];
