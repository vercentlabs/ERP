export const foodAndBeverageCloseWorkflow = {
  module: "industry-packs/food-and-beverage",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for industry-packs/food-and-beverage record ${recordId}`;
  },
};
