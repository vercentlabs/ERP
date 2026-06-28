export const salesOrdersCancelWorkflow = {
  module: "sales/sales-orders",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/sales-orders record ${recordId}`;
  },
};
