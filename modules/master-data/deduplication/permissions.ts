export const permissions = {
  read: "master-data/deduplication:read",
  create: "master-data/deduplication:create",
  update: "master-data/deduplication:update",
  submit: "master-data/deduplication:submit",
  approve: "master-data/deduplication:approve",
  reject: "master-data/deduplication:reject",
  cancel: "master-data/deduplication:cancel",
  close: "master-data/deduplication:close",
  report: "master-data/deduplication:report",
} as const;

export type DeduplicationPermission = (typeof permissions)[keyof typeof permissions];
