export const meteredUsageApproveWorkflow = {
  module: "subscriptions/metered-usage",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for subscriptions/metered-usage record ${recordId}`;
  },
};
