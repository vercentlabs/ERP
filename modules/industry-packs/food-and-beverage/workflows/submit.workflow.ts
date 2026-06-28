export const foodAndBeverageSubmitWorkflow = {
  module: "industry-packs/food-and-beverage",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for industry-packs/food-and-beverage record ${recordId}`;
  },
};
