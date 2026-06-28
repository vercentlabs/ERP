export const salesOrdersRejectWorkflow = {
  module: "sales/sales-orders",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/sales-orders record ${recordId}`;
  },
};
