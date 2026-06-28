export const stockAdjustmentsApproveWorkflow = {
  module: "inventory/stock-adjustments",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/stock-adjustments record ${recordId}`;
  },
};
