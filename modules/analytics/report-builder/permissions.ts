export const permissions = {
  read: "analytics/report-builder:read",
  create: "analytics/report-builder:create",
  update: "analytics/report-builder:update",
  submit: "analytics/report-builder:submit",
  approve: "analytics/report-builder:approve",
  reject: "analytics/report-builder:reject",
  cancel: "analytics/report-builder:cancel",
  close: "analytics/report-builder:close",
  report: "analytics/report-builder:report",
} as const;

export type ReportBuilderPermission = (typeof permissions)[keyof typeof permissions];
