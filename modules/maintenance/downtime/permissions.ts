export const permissions = {
  read: "maintenance/downtime:read",
  create: "maintenance/downtime:create",
  update: "maintenance/downtime:update",
  submit: "maintenance/downtime:submit",
  approve: "maintenance/downtime:approve",
  reject: "maintenance/downtime:reject",
  cancel: "maintenance/downtime:cancel",
  close: "maintenance/downtime:close",
  report: "maintenance/downtime:report",
} as const;

export type DowntimePermission = (typeof permissions)[keyof typeof permissions];
