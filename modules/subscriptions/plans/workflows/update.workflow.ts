export const plansUpdateWorkflow = {
  module: "subscriptions/plans",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for subscriptions/plans record ${recordId}`;
  },
};
