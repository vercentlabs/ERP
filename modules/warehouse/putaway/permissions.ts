export const permissions = {
  read: "warehouse/putaway:read",
  create: "warehouse/putaway:create",
  update: "warehouse/putaway:update",
  submit: "warehouse/putaway:submit",
  approve: "warehouse/putaway:approve",
  reject: "warehouse/putaway:reject",
  cancel: "warehouse/putaway:cancel",
  close: "warehouse/putaway:close",
  report: "warehouse/putaway:report",
} as const;

export type PutawayPermission = (typeof permissions)[keyof typeof permissions];
