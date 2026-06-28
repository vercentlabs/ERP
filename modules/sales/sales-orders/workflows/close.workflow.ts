export const salesOrdersCloseWorkflow = {
  module: "sales/sales-orders",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/sales-orders record ${recordId}`;
  },
};
