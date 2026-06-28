export const deferredRevenueCancelWorkflow = {
  module: "finance/deferred-revenue",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/deferred-revenue record ${recordId}`;
  },
};
