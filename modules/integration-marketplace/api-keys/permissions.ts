export const permissions = {
  read: "integration-marketplace/api-keys:read",
  create: "integration-marketplace/api-keys:create",
  update: "integration-marketplace/api-keys:update",
  submit: "integration-marketplace/api-keys:submit",
  approve: "integration-marketplace/api-keys:approve",
  reject: "integration-marketplace/api-keys:reject",
  cancel: "integration-marketplace/api-keys:cancel",
  close: "integration-marketplace/api-keys:close",
  report: "integration-marketplace/api-keys:report",
} as const;

export type ApiKeysPermission = (typeof permissions)[keyof typeof permissions];
