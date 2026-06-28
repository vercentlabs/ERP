export const meteredUsageSubmitWorkflow = {
  module: "subscriptions/metered-usage",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for subscriptions/metered-usage record ${recordId}`;
  },
};
