export const supplierScorecardsSubmitWorkflow = {
  module: "procurement/supplier-scorecards",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for procurement/supplier-scorecards record ${recordId}`;
  },
};
