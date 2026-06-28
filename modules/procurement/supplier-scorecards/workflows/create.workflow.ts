export const supplierScorecardsCreateWorkflow = {
  module: "procurement/supplier-scorecards",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for procurement/supplier-scorecards record ${recordId}`;
  },
};
