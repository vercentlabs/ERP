export const deferredRevenueSubmitWorkflow = {
  module: "finance/deferred-revenue",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/deferred-revenue record ${recordId}`;
  },
};
