export const consolidationRejectWorkflow = {
  module: "finance/consolidation",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/consolidation record ${recordId}`;
  },
};
