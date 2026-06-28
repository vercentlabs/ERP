export const meteredUsageUpdateWorkflow = {
  module: "subscriptions/metered-usage",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for subscriptions/metered-usage record ${recordId}`;
  },
};
