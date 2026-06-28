export const permissions = {
  read: "analytics/dashboards:read",
  create: "analytics/dashboards:create",
  update: "analytics/dashboards:update",
  submit: "analytics/dashboards:submit",
  approve: "analytics/dashboards:approve",
  reject: "analytics/dashboards:reject",
  cancel: "analytics/dashboards:cancel",
  close: "analytics/dashboards:close",
  report: "analytics/dashboards:report",
} as const;

export type DashboardsPermission = (typeof permissions)[keyof typeof permissions];
