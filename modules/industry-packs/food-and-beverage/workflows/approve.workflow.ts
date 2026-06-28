export const foodAndBeverageApproveWorkflow = {
  module: "industry-packs/food-and-beverage",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for industry-packs/food-and-beverage record ${recordId}`;
  },
};
