export const supplierScorecardsCancelWorkflow = {
  module: "procurement/supplier-scorecards",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for procurement/supplier-scorecards record ${recordId}`;
  },
};
