export const permissions = {
  read: "logistics/delivery-runs:read",
  create: "logistics/delivery-runs:create",
  update: "logistics/delivery-runs:update",
  submit: "logistics/delivery-runs:submit",
  approve: "logistics/delivery-runs:approve",
  reject: "logistics/delivery-runs:reject",
  cancel: "logistics/delivery-runs:cancel",
  close: "logistics/delivery-runs:close",
  report: "logistics/delivery-runs:report",
} as const;

export type DeliveryRunsPermission = (typeof permissions)[keyof typeof permissions];
