export const discountsUpdateWorkflow = {
  module: "sales/discounts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/discounts record ${recordId}`;
  },
};
