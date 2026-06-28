export const permissions = {
  read: "industry-packs/nonprofit:read",
  create: "industry-packs/nonprofit:create",
  update: "industry-packs/nonprofit:update",
  submit: "industry-packs/nonprofit:submit",
  approve: "industry-packs/nonprofit:approve",
  reject: "industry-packs/nonprofit:reject",
  cancel: "industry-packs/nonprofit:cancel",
  close: "industry-packs/nonprofit:close",
  report: "industry-packs/nonprofit:report",
} as const;

export type NonprofitPermission = (typeof permissions)[keyof typeof permissions];
