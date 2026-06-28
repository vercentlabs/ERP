export const meteredUsageCancelWorkflow = {
  module: "subscriptions/metered-usage",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for subscriptions/metered-usage record ${recordId}`;
  },
};
