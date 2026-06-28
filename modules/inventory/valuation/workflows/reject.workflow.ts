export const valuationRejectWorkflow = {
  module: "inventory/valuation",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for inventory/valuation record ${recordId}`;
  },
};
