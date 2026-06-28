export const consolidationUpdateWorkflow = {
  module: "finance/consolidation",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/consolidation record ${recordId}`;
  },
};
