export const profitCentersApproveWorkflow = {
  module: "finance/profit-centers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/profit-centers record ${recordId}`;
  },
};
