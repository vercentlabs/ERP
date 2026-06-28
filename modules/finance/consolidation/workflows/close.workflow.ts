export const consolidationCloseWorkflow = {
  module: "finance/consolidation",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/consolidation record ${recordId}`;
  },
};
