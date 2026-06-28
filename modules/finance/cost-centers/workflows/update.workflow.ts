export const costCentersUpdateWorkflow = {
  module: "finance/cost-centers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/cost-centers record ${recordId}`;
  },
};
