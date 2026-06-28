export const permissions = {
  read: "logistics/shipment-tracking:read",
  create: "logistics/shipment-tracking:create",
  update: "logistics/shipment-tracking:update",
  submit: "logistics/shipment-tracking:submit",
  approve: "logistics/shipment-tracking:approve",
  reject: "logistics/shipment-tracking:reject",
  cancel: "logistics/shipment-tracking:cancel",
  close: "logistics/shipment-tracking:close",
  report: "logistics/shipment-tracking:report",
} as const;

export type ShipmentTrackingPermission = (typeof permissions)[keyof typeof permissions];
