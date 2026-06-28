export const discountsCancelWorkflow = {
  module: "sales/discounts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/discounts record ${recordId}`;
  },
};
