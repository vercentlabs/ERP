export const salesOrdersUpdateWorkflow = {
  module: "sales/sales-orders",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/sales-orders record ${recordId}`;
  },
};
