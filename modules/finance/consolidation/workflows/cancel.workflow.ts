export const consolidationCancelWorkflow = {
  module: "finance/consolidation",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/consolidation record ${recordId}`;
  },
};
