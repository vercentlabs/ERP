export const permissions = {
  read: "industry-packs/professional-services:read",
  create: "industry-packs/professional-services:create",
  update: "industry-packs/professional-services:update",
  submit: "industry-packs/professional-services:submit",
  approve: "industry-packs/professional-services:approve",
  reject: "industry-packs/professional-services:reject",
  cancel: "industry-packs/professional-services:cancel",
  close: "industry-packs/professional-services:close",
  report: "industry-packs/professional-services:report",
} as const;

export type ProfessionalServicesPermission = (typeof permissions)[keyof typeof permissions];
