export const priceBooksRejectWorkflow = {
  module: "sales/price-books",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/price-books record ${recordId}`;
  },
};
