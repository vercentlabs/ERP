export const permissions = {
  read: "industry-packs/software-saas:read",
  create: "industry-packs/software-saas:create",
  update: "industry-packs/software-saas:update",
  submit: "industry-packs/software-saas:submit",
  approve: "industry-packs/software-saas:approve",
  reject: "industry-packs/software-saas:reject",
  cancel: "industry-packs/software-saas:cancel",
  close: "industry-packs/software-saas:close",
  report: "industry-packs/software-saas:report",
} as const;

export type SoftwareSaasPermission = (typeof permissions)[keyof typeof permissions];
