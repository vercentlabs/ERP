export const meteredUsageRejectWorkflow = {
  module: "subscriptions/metered-usage",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for subscriptions/metered-usage record ${recordId}`;
  },
};
