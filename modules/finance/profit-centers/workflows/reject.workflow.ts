export const profitCentersRejectWorkflow = {
  module: "finance/profit-centers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/profit-centers record ${recordId}`;
  },
};
