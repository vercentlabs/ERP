export const profitCentersUpdateWorkflow = {
  module: "finance/profit-centers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/profit-centers record ${recordId}`;
  },
};
