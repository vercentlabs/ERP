export const permissions = {
  read: "inventory/cycle-counts:read",
  create: "inventory/cycle-counts:create",
  update: "inventory/cycle-counts:update",
  submit: "inventory/cycle-counts:submit",
  approve: "inventory/cycle-counts:approve",
  reject: "inventory/cycle-counts:reject",
  cancel: "inventory/cycle-counts:cancel",
  close: "inventory/cycle-counts:close",
  report: "inventory/cycle-counts:report",
} as const;

export type CycleCountsPermission = (typeof permissions)[keyof typeof permissions];
