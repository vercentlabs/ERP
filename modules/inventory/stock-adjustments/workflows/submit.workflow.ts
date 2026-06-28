export const stockAdjustmentsSubmitWorkflow = {
  module: "inventory/stock-adjustments",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for inventory/stock-adjustments record ${recordId}`;
  },
};
