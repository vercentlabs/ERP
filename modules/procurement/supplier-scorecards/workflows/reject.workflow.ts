export const supplierScorecardsRejectWorkflow = {
  module: "procurement/supplier-scorecards",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/supplier-scorecards record ${recordId}`;
  },
};
