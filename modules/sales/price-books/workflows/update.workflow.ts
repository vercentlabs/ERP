export const priceBooksUpdateWorkflow = {
  module: "sales/price-books",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/price-books record ${recordId}`;
  },
};
