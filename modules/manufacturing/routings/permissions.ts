export const permissions = {
  read: "manufacturing/routings:read",
  create: "manufacturing/routings:create",
  update: "manufacturing/routings:update",
  submit: "manufacturing/routings:submit",
  approve: "manufacturing/routings:approve",
  reject: "manufacturing/routings:reject",
  cancel: "manufacturing/routings:cancel",
  close: "manufacturing/routings:close",
  report: "manufacturing/routings:report",
} as const;

export type RoutingsPermission = (typeof permissions)[keyof typeof permissions];
