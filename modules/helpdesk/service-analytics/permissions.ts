export const permissions = {
  read: "helpdesk/service-analytics:read",
  create: "helpdesk/service-analytics:create",
  update: "helpdesk/service-analytics:update",
  submit: "helpdesk/service-analytics:submit",
  approve: "helpdesk/service-analytics:approve",
  reject: "helpdesk/service-analytics:reject",
  cancel: "helpdesk/service-analytics:cancel",
  close: "helpdesk/service-analytics:close",
  report: "helpdesk/service-analytics:report",
} as const;

export type ServiceAnalyticsPermission = (typeof permissions)[keyof typeof permissions];
