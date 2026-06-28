export const permissions = {
  read: "manufacturing/shop-floor:read",
  create: "manufacturing/shop-floor:create",
  update: "manufacturing/shop-floor:update",
  submit: "manufacturing/shop-floor:submit",
  approve: "manufacturing/shop-floor:approve",
  reject: "manufacturing/shop-floor:reject",
  cancel: "manufacturing/shop-floor:cancel",
  close: "manufacturing/shop-floor:close",
  report: "manufacturing/shop-floor:report",
} as const;

export type ShopFloorPermission = (typeof permissions)[keyof typeof permissions];
