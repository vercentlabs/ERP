export const permissions = {
  read: "compliance/certifications:read",
  create: "compliance/certifications:create",
  update: "compliance/certifications:update",
  submit: "compliance/certifications:submit",
  approve: "compliance/certifications:approve",
  reject: "compliance/certifications:reject",
  cancel: "compliance/certifications:cancel",
  close: "compliance/certifications:close",
  report: "compliance/certifications:report",
} as const;

export type CertificationsPermission = (typeof permissions)[keyof typeof permissions];
