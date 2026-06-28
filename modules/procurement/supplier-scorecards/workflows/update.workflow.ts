export const supplierScorecardsUpdateWorkflow = {
  module: "procurement/supplier-scorecards",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for procurement/supplier-scorecards record ${recordId}`;
  },
};
