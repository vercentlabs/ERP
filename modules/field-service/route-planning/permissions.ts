export const permissions = {
  read: "field-service/route-planning:read",
  create: "field-service/route-planning:create",
  update: "field-service/route-planning:update",
  submit: "field-service/route-planning:submit",
  approve: "field-service/route-planning:approve",
  reject: "field-service/route-planning:reject",
  cancel: "field-service/route-planning:cancel",
  close: "field-service/route-planning:close",
  report: "field-service/route-planning:report",
} as const;

export type RoutePlanningPermission = (typeof permissions)[keyof typeof permissions];
