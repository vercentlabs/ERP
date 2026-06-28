export const permissions = {
  read: "inventory/barcode:read",
  create: "inventory/barcode:create",
  update: "inventory/barcode:update",
  submit: "inventory/barcode:submit",
  approve: "inventory/barcode:approve",
  reject: "inventory/barcode:reject",
  cancel: "inventory/barcode:cancel",
  close: "inventory/barcode:close",
  report: "inventory/barcode:report",
} as const;

export type BarcodePermission = (typeof permissions)[keyof typeof permissions];
