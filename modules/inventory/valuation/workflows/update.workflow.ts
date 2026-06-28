export const valuationUpdateWorkflow = {
  module: "inventory/valuation",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for inventory/valuation record ${recordId}`;
  },
};
