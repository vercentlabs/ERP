export const permissions = {
  read: "maintenance/asset-performance:read",
  create: "maintenance/asset-performance:create",
  update: "maintenance/asset-performance:update",
  submit: "maintenance/asset-performance:submit",
  approve: "maintenance/asset-performance:approve",
  reject: "maintenance/asset-performance:reject",
  cancel: "maintenance/asset-performance:cancel",
  close: "maintenance/asset-performance:close",
  report: "maintenance/asset-performance:report",
} as const;

export type AssetPerformancePermission = (typeof permissions)[keyof typeof permissions];
