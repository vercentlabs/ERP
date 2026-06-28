export const priceBooksCreateWorkflow = {
  module: "sales/price-books",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/price-books record ${recordId}`;
  },
};
