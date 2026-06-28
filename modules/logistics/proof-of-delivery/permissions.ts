export const permissions = {
  read: "logistics/proof-of-delivery:read",
  create: "logistics/proof-of-delivery:create",
  update: "logistics/proof-of-delivery:update",
  submit: "logistics/proof-of-delivery:submit",
  approve: "logistics/proof-of-delivery:approve",
  reject: "logistics/proof-of-delivery:reject",
  cancel: "logistics/proof-of-delivery:cancel",
  close: "logistics/proof-of-delivery:close",
  report: "logistics/proof-of-delivery:report",
} as const;

export type ProofOfDeliveryPermission = (typeof permissions)[keyof typeof permissions];
