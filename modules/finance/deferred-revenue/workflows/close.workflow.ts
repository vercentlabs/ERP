export const deferredRevenueCloseWorkflow = {
  module: "finance/deferred-revenue",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/deferred-revenue record ${recordId}`;
  },
};
