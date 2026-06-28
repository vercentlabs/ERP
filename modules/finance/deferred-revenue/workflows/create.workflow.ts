export const deferredRevenueCreateWorkflow = {
  module: "finance/deferred-revenue",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/deferred-revenue record ${recordId}`;
  },
};
