export const permissions = {
  read: "quality/non-conformance:read",
  create: "quality/non-conformance:create",
  update: "quality/non-conformance:update",
  submit: "quality/non-conformance:submit",
  approve: "quality/non-conformance:approve",
  reject: "quality/non-conformance:reject",
  cancel: "quality/non-conformance:cancel",
  close: "quality/non-conformance:close",
  report: "quality/non-conformance:report",
} as const;

export type NonConformancePermission = (typeof permissions)[keyof typeof permissions];
