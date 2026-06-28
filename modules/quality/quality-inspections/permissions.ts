export const permissions = {
  read: "quality/quality-inspections:read",
  create: "quality/quality-inspections:create",
  update: "quality/quality-inspections:update",
  submit: "quality/quality-inspections:submit",
  approve: "quality/quality-inspections:approve",
  reject: "quality/quality-inspections:reject",
  cancel: "quality/quality-inspections:cancel",
  close: "quality/quality-inspections:close",
  report: "quality/quality-inspections:report",
} as const;

export type QualityInspectionsPermission = (typeof permissions)[keyof typeof permissions];
