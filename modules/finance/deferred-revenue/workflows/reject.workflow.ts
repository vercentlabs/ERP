export const deferredRevenueRejectWorkflow = {
  module: "finance/deferred-revenue",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/deferred-revenue record ${recordId}`;
  },
};
