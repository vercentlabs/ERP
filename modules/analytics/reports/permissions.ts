export const permissions = {
  read: "analytics/reports:read",
  create: "analytics/reports:create",
  update: "analytics/reports:update",
  submit: "analytics/reports:submit",
  approve: "analytics/reports:approve",
  reject: "analytics/reports:reject",
  cancel: "analytics/reports:cancel",
  close: "analytics/reports:close",
  report: "analytics/reports:report",
} as const;

export type ReportsPermission = (typeof permissions)[keyof typeof permissions];
