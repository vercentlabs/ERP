export const permissions = {
  read: "industry-packs/automotive:read",
  create: "industry-packs/automotive:create",
  update: "industry-packs/automotive:update",
  submit: "industry-packs/automotive:submit",
  approve: "industry-packs/automotive:approve",
  reject: "industry-packs/automotive:reject",
  cancel: "industry-packs/automotive:cancel",
  close: "industry-packs/automotive:close",
  report: "industry-packs/automotive:report",
} as const;

export type AutomotivePermission = (typeof permissions)[keyof typeof permissions];
