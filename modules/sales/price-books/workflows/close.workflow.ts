export const priceBooksCloseWorkflow = {
  module: "sales/price-books",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/price-books record ${recordId}`;
  },
};
