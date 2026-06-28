export const permissions = {
  read: "hr/designations:read",
  create: "hr/designations:create",
  update: "hr/designations:update",
  submit: "hr/designations:submit",
  approve: "hr/designations:approve",
  reject: "hr/designations:reject",
  cancel: "hr/designations:cancel",
  close: "hr/designations:close",
  report: "hr/designations:report",
} as const;

export type DesignationsPermission = (typeof permissions)[keyof typeof permissions];
