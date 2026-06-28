export const permissions = {
  read: "quality/quality-certificates:read",
  create: "quality/quality-certificates:create",
  update: "quality/quality-certificates:update",
  submit: "quality/quality-certificates:submit",
  approve: "quality/quality-certificates:approve",
  reject: "quality/quality-certificates:reject",
  cancel: "quality/quality-certificates:cancel",
  close: "quality/quality-certificates:close",
  report: "quality/quality-certificates:report",
} as const;

export type QualityCertificatesPermission = (typeof permissions)[keyof typeof permissions];
