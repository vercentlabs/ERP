export const supplierScorecardsCloseWorkflow = {
  module: "procurement/supplier-scorecards",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for procurement/supplier-scorecards record ${recordId}`;
  },
};
