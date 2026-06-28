export const deferredRevenueUpdateWorkflow = {
  module: "finance/deferred-revenue",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/deferred-revenue record ${recordId}`;
  },
};
