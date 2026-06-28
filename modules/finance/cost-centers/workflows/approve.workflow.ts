export const costCentersApproveWorkflow = {
  module: "finance/cost-centers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/cost-centers record ${recordId}`;
  },
};
