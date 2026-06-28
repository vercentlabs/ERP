export const permissions = {
  read: "integration-marketplace/developer-portal:read",
  create: "integration-marketplace/developer-portal:create",
  update: "integration-marketplace/developer-portal:update",
  submit: "integration-marketplace/developer-portal:submit",
  approve: "integration-marketplace/developer-portal:approve",
  reject: "integration-marketplace/developer-portal:reject",
  cancel: "integration-marketplace/developer-portal:cancel",
  close: "integration-marketplace/developer-portal:close",
  report: "integration-marketplace/developer-portal:report",
} as const;

export type DeveloperPortalPermission = (typeof permissions)[keyof typeof permissions];
