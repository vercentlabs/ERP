export const permissions = {
  read: "enterprise-performance/management-reporting:read",
  create: "enterprise-performance/management-reporting:create",
  update: "enterprise-performance/management-reporting:update",
  submit: "enterprise-performance/management-reporting:submit",
  approve: "enterprise-performance/management-reporting:approve",
  reject: "enterprise-performance/management-reporting:reject",
  cancel: "enterprise-performance/management-reporting:cancel",
  close: "enterprise-performance/management-reporting:close",
  report: "enterprise-performance/management-reporting:report",
} as const;

export type ManagementReportingPermission = (typeof permissions)[keyof typeof permissions];
