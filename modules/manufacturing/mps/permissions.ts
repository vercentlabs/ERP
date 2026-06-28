export const permissions = {
  read: "manufacturing/mps:read",
  create: "manufacturing/mps:create",
  update: "manufacturing/mps:update",
  submit: "manufacturing/mps:submit",
  approve: "manufacturing/mps:approve",
  reject: "manufacturing/mps:reject",
  cancel: "manufacturing/mps:cancel",
  close: "manufacturing/mps:close",
  report: "manufacturing/mps:report",
} as const;

export type MpsPermission = (typeof permissions)[keyof typeof permissions];
