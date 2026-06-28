export const meteredUsageCreateWorkflow = {
  module: "subscriptions/metered-usage",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for subscriptions/metered-usage record ${recordId}`;
  },
};
