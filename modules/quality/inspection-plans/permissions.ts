export const permissions = {
  read: "quality/inspection-plans:read",
  create: "quality/inspection-plans:create",
  update: "quality/inspection-plans:update",
  submit: "quality/inspection-plans:submit",
  approve: "quality/inspection-plans:approve",
  reject: "quality/inspection-plans:reject",
  cancel: "quality/inspection-plans:cancel",
  close: "quality/inspection-plans:close",
  report: "quality/inspection-plans:report",
} as const;

export type InspectionPlansPermission = (typeof permissions)[keyof typeof permissions];
