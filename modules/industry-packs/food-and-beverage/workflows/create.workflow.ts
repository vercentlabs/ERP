export const foodAndBeverageCreateWorkflow = {
  module: "industry-packs/food-and-beverage",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for industry-packs/food-and-beverage record ${recordId}`;
  },
};
