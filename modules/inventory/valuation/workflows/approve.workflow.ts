export const valuationApproveWorkflow = {
  module: "inventory/valuation",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for inventory/valuation record ${recordId}`;
  },
};
