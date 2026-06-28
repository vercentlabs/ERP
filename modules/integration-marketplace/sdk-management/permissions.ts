export const permissions = {
  read: "integration-marketplace/sdk-management:read",
  create: "integration-marketplace/sdk-management:create",
  update: "integration-marketplace/sdk-management:update",
  submit: "integration-marketplace/sdk-management:submit",
  approve: "integration-marketplace/sdk-management:approve",
  reject: "integration-marketplace/sdk-management:reject",
  cancel: "integration-marketplace/sdk-management:cancel",
  close: "integration-marketplace/sdk-management:close",
  report: "integration-marketplace/sdk-management:report",
} as const;

export type SdkManagementPermission = (typeof permissions)[keyof typeof permissions];
