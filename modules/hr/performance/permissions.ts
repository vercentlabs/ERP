export const permissions = {
  read: "hr/performance:read",
  create: "hr/performance:create",
  update: "hr/performance:update",
  submit: "hr/performance:submit",
  approve: "hr/performance:approve",
  reject: "hr/performance:reject",
  cancel: "hr/performance:cancel",
  close: "hr/performance:close",
  report: "hr/performance:report",
} as const;

export type PerformancePermission = (typeof permissions)[keyof typeof permissions];
