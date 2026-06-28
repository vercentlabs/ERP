export const foodAndBeverageCancelWorkflow = {
  module: "industry-packs/food-and-beverage",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for industry-packs/food-and-beverage record ${recordId}`;
  },
};
