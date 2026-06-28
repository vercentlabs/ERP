export const permissions = {
  read: "enterprise-performance/board-packs:read",
  create: "enterprise-performance/board-packs:create",
  update: "enterprise-performance/board-packs:update",
  submit: "enterprise-performance/board-packs:submit",
  approve: "enterprise-performance/board-packs:approve",
  reject: "enterprise-performance/board-packs:reject",
  cancel: "enterprise-performance/board-packs:cancel",
  close: "enterprise-performance/board-packs:close",
  report: "enterprise-performance/board-packs:report",
} as const;

export type BoardPacksPermission = (typeof permissions)[keyof typeof permissions];
