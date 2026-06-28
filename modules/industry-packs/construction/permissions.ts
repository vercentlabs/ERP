export const permissions = {
  read: "industry-packs/construction:read",
  create: "industry-packs/construction:create",
  update: "industry-packs/construction:update",
  submit: "industry-packs/construction:submit",
  approve: "industry-packs/construction:approve",
  reject: "industry-packs/construction:reject",
  cancel: "industry-packs/construction:cancel",
  close: "industry-packs/construction:close",
  report: "industry-packs/construction:report",
} as const;

export type ConstructionPermission = (typeof permissions)[keyof typeof permissions];
