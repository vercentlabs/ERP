export const permissions = {
  read: "integration-marketplace/installed-apps:read",
  create: "integration-marketplace/installed-apps:create",
  update: "integration-marketplace/installed-apps:update",
  submit: "integration-marketplace/installed-apps:submit",
  approve: "integration-marketplace/installed-apps:approve",
  reject: "integration-marketplace/installed-apps:reject",
  cancel: "integration-marketplace/installed-apps:cancel",
  close: "integration-marketplace/installed-apps:close",
  report: "integration-marketplace/installed-apps:report",
} as const;

export type InstalledAppsPermission = (typeof permissions)[keyof typeof permissions];
