export const permissions = {
  read: "compliance/segregation-of-duties:read",
  create: "compliance/segregation-of-duties:create",
  update: "compliance/segregation-of-duties:update",
  submit: "compliance/segregation-of-duties:submit",
  approve: "compliance/segregation-of-duties:approve",
  reject: "compliance/segregation-of-duties:reject",
  cancel: "compliance/segregation-of-duties:cancel",
  close: "compliance/segregation-of-duties:close",
  report: "compliance/segregation-of-duties:report",
} as const;

export type SegregationOfDutiesPermission = (typeof permissions)[keyof typeof permissions];
