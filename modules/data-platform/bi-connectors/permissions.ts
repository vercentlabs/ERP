export const permissions = {
  read: "data-platform/bi-connectors:read",
  create: "data-platform/bi-connectors:create",
  update: "data-platform/bi-connectors:update",
  submit: "data-platform/bi-connectors:submit",
  approve: "data-platform/bi-connectors:approve",
  reject: "data-platform/bi-connectors:reject",
  cancel: "data-platform/bi-connectors:cancel",
  close: "data-platform/bi-connectors:close",
  report: "data-platform/bi-connectors:report",
} as const;

export type BiConnectorsPermission = (typeof permissions)[keyof typeof permissions];
