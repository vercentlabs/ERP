export const permissions = {
  read: "product-lifecycle/compliance-documents:read",
  create: "product-lifecycle/compliance-documents:create",
  update: "product-lifecycle/compliance-documents:update",
  submit: "product-lifecycle/compliance-documents:submit",
  approve: "product-lifecycle/compliance-documents:approve",
  reject: "product-lifecycle/compliance-documents:reject",
  cancel: "product-lifecycle/compliance-documents:cancel",
  close: "product-lifecycle/compliance-documents:close",
  report: "product-lifecycle/compliance-documents:report",
} as const;

export type ComplianceDocumentsPermission = (typeof permissions)[keyof typeof permissions];
