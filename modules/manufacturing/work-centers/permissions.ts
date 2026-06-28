export const permissions = {
  read: "manufacturing/work-centers:read",
  create: "manufacturing/work-centers:create",
  update: "manufacturing/work-centers:update",
  submit: "manufacturing/work-centers:submit",
  approve: "manufacturing/work-centers:approve",
  reject: "manufacturing/work-centers:reject",
  cancel: "manufacturing/work-centers:cancel",
  close: "manufacturing/work-centers:close",
  report: "manufacturing/work-centers:report",
} as const;

export type WorkCentersPermission = (typeof permissions)[keyof typeof permissions];
