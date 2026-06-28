export const permissions = {
  read: "inventory/serial-batches:read",
  create: "inventory/serial-batches:create",
  update: "inventory/serial-batches:update",
  submit: "inventory/serial-batches:submit",
  approve: "inventory/serial-batches:approve",
  reject: "inventory/serial-batches:reject",
  cancel: "inventory/serial-batches:cancel",
  close: "inventory/serial-batches:close",
  report: "inventory/serial-batches:report",
} as const;

export type SerialBatchesPermission = (typeof permissions)[keyof typeof permissions];
