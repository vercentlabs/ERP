export const permissions = {
  read: "enterprise-performance/variance-analysis:read",
  create: "enterprise-performance/variance-analysis:create",
  update: "enterprise-performance/variance-analysis:update",
  submit: "enterprise-performance/variance-analysis:submit",
  approve: "enterprise-performance/variance-analysis:approve",
  reject: "enterprise-performance/variance-analysis:reject",
  cancel: "enterprise-performance/variance-analysis:cancel",
  close: "enterprise-performance/variance-analysis:close",
  report: "enterprise-performance/variance-analysis:report",
} as const;

export type VarianceAnalysisPermission = (typeof permissions)[keyof typeof permissions];
