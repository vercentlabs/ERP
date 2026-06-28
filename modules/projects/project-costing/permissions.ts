export const permissions = {
  read: "projects/project-costing:read",
  create: "projects/project-costing:create",
  update: "projects/project-costing:update",
  submit: "projects/project-costing:submit",
  approve: "projects/project-costing:approve",
  reject: "projects/project-costing:reject",
  cancel: "projects/project-costing:cancel",
  close: "projects/project-costing:close",
  report: "projects/project-costing:report",
} as const;

export type ProjectCostingPermission = (typeof permissions)[keyof typeof permissions];
