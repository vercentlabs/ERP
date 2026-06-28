export const permissions = {
  read: "industry-packs/healthcare:read",
  create: "industry-packs/healthcare:create",
  update: "industry-packs/healthcare:update",
  submit: "industry-packs/healthcare:submit",
  approve: "industry-packs/healthcare:approve",
  reject: "industry-packs/healthcare:reject",
  cancel: "industry-packs/healthcare:cancel",
  close: "industry-packs/healthcare:close",
  report: "industry-packs/healthcare:report",
} as const;

export type HealthcarePermission = (typeof permissions)[keyof typeof permissions];
