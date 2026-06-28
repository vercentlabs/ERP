export const stockAdjustmentsRejectWorkflow = {
  module: "inventory/stock-adjustments",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/stock-adjustments record ${recordId}`;
  },
};
