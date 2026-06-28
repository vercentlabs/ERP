export const profitCentersCloseWorkflow = {
  module: "finance/profit-centers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/profit-centers record ${recordId}`;
  },
};
