export const valuationCancelWorkflow = {
  module: "inventory/valuation",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for inventory/valuation record ${recordId}`;
  },
};
