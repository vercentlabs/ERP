export const supplierScorecardsApproveWorkflow = {
  module: "procurement/supplier-scorecards",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/supplier-scorecards record ${recordId}`;
  },
};
