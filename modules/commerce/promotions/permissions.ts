export const permissions = {
  read: "commerce/promotions:read",
  create: "commerce/promotions:create",
  update: "commerce/promotions:update",
  submit: "commerce/promotions:submit",
  approve: "commerce/promotions:approve",
  reject: "commerce/promotions:reject",
  cancel: "commerce/promotions:cancel",
  close: "commerce/promotions:close",
  report: "commerce/promotions:report",
} as const;

export type PromotionsPermission = (typeof permissions)[keyof typeof permissions];
