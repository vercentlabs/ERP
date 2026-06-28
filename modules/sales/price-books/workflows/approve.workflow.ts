export const priceBooksApproveWorkflow = {
  module: "sales/price-books",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/price-books record ${recordId}`;
  },
};
