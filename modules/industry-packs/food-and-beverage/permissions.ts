export const permissions = {
  read: "industry-packs/food-and-beverage:read",
  create: "industry-packs/food-and-beverage:create",
  update: "industry-packs/food-and-beverage:update",
  submit: "industry-packs/food-and-beverage:submit",
  approve: "industry-packs/food-and-beverage:approve",
  reject: "industry-packs/food-and-beverage:reject",
  cancel: "industry-packs/food-and-beverage:cancel",
  close: "industry-packs/food-and-beverage:close",
  report: "industry-packs/food-and-beverage:report",
} as const;

export type FoodAndBeveragePermission = (typeof permissions)[keyof typeof permissions];
