export const permissions = {
  read: "extension-studio/custom-dashboards:read",
  create: "extension-studio/custom-dashboards:create",
  update: "extension-studio/custom-dashboards:update",
  submit: "extension-studio/custom-dashboards:submit",
  approve: "extension-studio/custom-dashboards:approve",
  reject: "extension-studio/custom-dashboards:reject",
  cancel: "extension-studio/custom-dashboards:cancel",
  close: "extension-studio/custom-dashboards:close",
  report: "extension-studio/custom-dashboards:report",
} as const;

export type CustomDashboardsPermission = (typeof permissions)[keyof typeof permissions];
