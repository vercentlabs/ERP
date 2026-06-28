export const consolidationApproveWorkflow = {
  module: "finance/consolidation",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/consolidation record ${recordId}`;
  },
};
