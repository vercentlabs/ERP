export const permissions = {
  read: "finance/consolidation:read",
  create: "finance/consolidation:create",
  update: "finance/consolidation:update",
  submit: "finance/consolidation:submit",
  approve: "finance/consolidation:approve",
  reject: "finance/consolidation:reject",
  cancel: "finance/consolidation:cancel",
  close: "finance/consolidation:close",
  report: "finance/consolidation:report",
} as const;

export type ConsolidationPermission = (typeof permissions)[keyof typeof permissions];
