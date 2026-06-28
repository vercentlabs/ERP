export const permissions = {
  read: "sustainability/compliance-disclosures:read",
  create: "sustainability/compliance-disclosures:create",
  update: "sustainability/compliance-disclosures:update",
  submit: "sustainability/compliance-disclosures:submit",
  approve: "sustainability/compliance-disclosures:approve",
  reject: "sustainability/compliance-disclosures:reject",
  cancel: "sustainability/compliance-disclosures:cancel",
  close: "sustainability/compliance-disclosures:close",
  report: "sustainability/compliance-disclosures:report",
} as const;

export type ComplianceDisclosuresPermission = (typeof permissions)[keyof typeof permissions];
