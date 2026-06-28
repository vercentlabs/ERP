export const permissions = {
  read: "warehouse/receiving:read",
  create: "warehouse/receiving:create",
  update: "warehouse/receiving:update",
  submit: "warehouse/receiving:submit",
  approve: "warehouse/receiving:approve",
  reject: "warehouse/receiving:reject",
  cancel: "warehouse/receiving:cancel",
  close: "warehouse/receiving:close",
  report: "warehouse/receiving:report",
} as const;

export type ReceivingPermission = (typeof permissions)[keyof typeof permissions];
