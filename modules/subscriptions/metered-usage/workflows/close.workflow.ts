export const meteredUsageCloseWorkflow = {
  module: "subscriptions/metered-usage",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for subscriptions/metered-usage record ${recordId}`;
  },
};
