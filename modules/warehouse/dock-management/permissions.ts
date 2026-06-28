export const permissions = {
  read: "warehouse/dock-management:read",
  create: "warehouse/dock-management:create",
  update: "warehouse/dock-management:update",
  submit: "warehouse/dock-management:submit",
  approve: "warehouse/dock-management:approve",
  reject: "warehouse/dock-management:reject",
  cancel: "warehouse/dock-management:cancel",
  close: "warehouse/dock-management:close",
  report: "warehouse/dock-management:report",
} as const;

export type DockManagementPermission = (typeof permissions)[keyof typeof permissions];
