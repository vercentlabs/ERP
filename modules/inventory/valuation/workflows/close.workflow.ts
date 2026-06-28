export const valuationCloseWorkflow = {
  module: "inventory/valuation",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for inventory/valuation record ${recordId}`;
  },
};
