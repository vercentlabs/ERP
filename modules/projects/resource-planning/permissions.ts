export const permissions = {
  read: "projects/resource-planning:read",
  create: "projects/resource-planning:create",
  update: "projects/resource-planning:update",
  submit: "projects/resource-planning:submit",
  approve: "projects/resource-planning:approve",
  reject: "projects/resource-planning:reject",
  cancel: "projects/resource-planning:cancel",
  close: "projects/resource-planning:close",
  report: "projects/resource-planning:report",
} as const;

export type ResourcePlanningPermission = (typeof permissions)[keyof typeof permissions];
