export const deferredRevenueApproveWorkflow = {
  module: "finance/deferred-revenue",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/deferred-revenue record ${recordId}`;
  },
};
