export const costCentersCloseWorkflow = {
  module: "finance/cost-centers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/cost-centers record ${recordId}`;
  },
};
