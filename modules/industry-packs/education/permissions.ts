export const permissions = {
  read: "industry-packs/education:read",
  create: "industry-packs/education:create",
  update: "industry-packs/education:update",
  submit: "industry-packs/education:submit",
  approve: "industry-packs/education:approve",
  reject: "industry-packs/education:reject",
  cancel: "industry-packs/education:cancel",
  close: "industry-packs/education:close",
  report: "industry-packs/education:report",
} as const;

export type EducationPermission = (typeof permissions)[keyof typeof permissions];
