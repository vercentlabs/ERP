export const permissions = {
  read: "hr/learning:read",
  create: "hr/learning:create",
  update: "hr/learning:update",
  submit: "hr/learning:submit",
  approve: "hr/learning:approve",
  reject: "hr/learning:reject",
  cancel: "hr/learning:cancel",
  close: "hr/learning:close",
  report: "hr/learning:report",
} as const;

export type LearningPermission = (typeof permissions)[keyof typeof permissions];
