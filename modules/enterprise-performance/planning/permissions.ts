export const permissions = {
  read: "enterprise-performance/planning:read",
  create: "enterprise-performance/planning:create",
  update: "enterprise-performance/planning:update",
  submit: "enterprise-performance/planning:submit",
  approve: "enterprise-performance/planning:approve",
  reject: "enterprise-performance/planning:reject",
  cancel: "enterprise-performance/planning:cancel",
  close: "enterprise-performance/planning:close",
  report: "enterprise-performance/planning:report",
} as const;

export type PlanningPermission = (typeof permissions)[keyof typeof permissions];
