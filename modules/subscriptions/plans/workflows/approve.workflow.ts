export const plansApproveWorkflow = {
  module: "subscriptions/plans",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for subscriptions/plans record ${recordId}`;
  },
};
