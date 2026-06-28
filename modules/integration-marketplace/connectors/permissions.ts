export const permissions = {
  read: "integration-marketplace/connectors:read",
  create: "integration-marketplace/connectors:create",
  update: "integration-marketplace/connectors:update",
  submit: "integration-marketplace/connectors:submit",
  approve: "integration-marketplace/connectors:approve",
  reject: "integration-marketplace/connectors:reject",
  cancel: "integration-marketplace/connectors:cancel",
  close: "integration-marketplace/connectors:close",
  report: "integration-marketplace/connectors:report",
} as const;

export type ConnectorsPermission = (typeof permissions)[keyof typeof permissions];
