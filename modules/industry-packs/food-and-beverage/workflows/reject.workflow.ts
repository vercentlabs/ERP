export const foodAndBeverageRejectWorkflow = {
  module: "industry-packs/food-and-beverage",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for industry-packs/food-and-beverage record ${recordId}`;
  },
};
