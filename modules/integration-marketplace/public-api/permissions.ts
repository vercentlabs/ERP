export const permissions = {
  read: "integration-marketplace/public-api:read",
  create: "integration-marketplace/public-api:create",
  update: "integration-marketplace/public-api:update",
  submit: "integration-marketplace/public-api:submit",
  approve: "integration-marketplace/public-api:approve",
  reject: "integration-marketplace/public-api:reject",
  cancel: "integration-marketplace/public-api:cancel",
  close: "integration-marketplace/public-api:close",
  report: "integration-marketplace/public-api:report",
} as const;

export type PublicApiPermission = (typeof permissions)[keyof typeof permissions];
