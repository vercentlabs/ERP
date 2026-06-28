export const foodAndBeverageUpdateWorkflow = {
  module: "industry-packs/food-and-beverage",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for industry-packs/food-and-beverage record ${recordId}`;
  },
};
