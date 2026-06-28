export const permissions = {
  read: "manufacturing/bill-of-materials:read",
  create: "manufacturing/bill-of-materials:create",
  update: "manufacturing/bill-of-materials:update",
  submit: "manufacturing/bill-of-materials:submit",
  approve: "manufacturing/bill-of-materials:approve",
  reject: "manufacturing/bill-of-materials:reject",
  cancel: "manufacturing/bill-of-materials:cancel",
  close: "manufacturing/bill-of-materials:close",
  report: "manufacturing/bill-of-materials:report",
} as const;

export type BillOfMaterialsPermission = (typeof permissions)[keyof typeof permissions];
