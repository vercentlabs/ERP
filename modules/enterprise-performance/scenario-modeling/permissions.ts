export const permissions = {
  read: "enterprise-performance/scenario-modeling:read",
  create: "enterprise-performance/scenario-modeling:create",
  update: "enterprise-performance/scenario-modeling:update",
  submit: "enterprise-performance/scenario-modeling:submit",
  approve: "enterprise-performance/scenario-modeling:approve",
  reject: "enterprise-performance/scenario-modeling:reject",
  cancel: "enterprise-performance/scenario-modeling:cancel",
  close: "enterprise-performance/scenario-modeling:close",
  report: "enterprise-performance/scenario-modeling:report",
} as const;

export type ScenarioModelingPermission = (typeof permissions)[keyof typeof permissions];
