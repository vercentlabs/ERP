export const priceBooksCancelWorkflow = {
  module: "sales/price-books",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/price-books record ${recordId}`;
  },
};
