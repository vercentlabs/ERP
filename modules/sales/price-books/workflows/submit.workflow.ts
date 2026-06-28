export const priceBooksSubmitWorkflow = {
  module: "sales/price-books",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/price-books record ${recordId}`;
  },
};
