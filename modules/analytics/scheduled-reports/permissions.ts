export const permissions = {
  read: "analytics/scheduled-reports:read",
  create: "analytics/scheduled-reports:create",
  update: "analytics/scheduled-reports:update",
  submit: "analytics/scheduled-reports:submit",
  approve: "analytics/scheduled-reports:approve",
  reject: "analytics/scheduled-reports:reject",
  cancel: "analytics/scheduled-reports:cancel",
  close: "analytics/scheduled-reports:close",
  report: "analytics/scheduled-reports:report",
} as const;

export type ScheduledReportsPermission = (typeof permissions)[keyof typeof permissions];
