export const permissions = {
  read: "logistics/freight-rates:read",
  create: "logistics/freight-rates:create",
  update: "logistics/freight-rates:update",
  submit: "logistics/freight-rates:submit",
  approve: "logistics/freight-rates:approve",
  reject: "logistics/freight-rates:reject",
  cancel: "logistics/freight-rates:cancel",
  close: "logistics/freight-rates:close",
  report: "logistics/freight-rates:report",
} as const;

export type FreightRatesPermission = (typeof permissions)[keyof typeof permissions];
