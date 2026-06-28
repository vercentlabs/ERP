export const permissions = {
  read: "inventory/reservations:read",
  create: "inventory/reservations:create",
  update: "inventory/reservations:update",
  submit: "inventory/reservations:submit",
  approve: "inventory/reservations:approve",
  reject: "inventory/reservations:reject",
  cancel: "inventory/reservations:cancel",
  close: "inventory/reservations:close",
  report: "inventory/reservations:report",
} as const;

export type ReservationsPermission = (typeof permissions)[keyof typeof permissions];
