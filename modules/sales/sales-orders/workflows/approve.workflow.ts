export const salesOrdersApproveWorkflow = {
  module: "sales/sales-orders",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/sales-orders record ${recordId}`;
  },
};
