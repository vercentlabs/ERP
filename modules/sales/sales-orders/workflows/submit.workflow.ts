export const salesOrdersSubmitWorkflow = {
  module: "sales/sales-orders",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/sales-orders record ${recordId}`;
  },
};
