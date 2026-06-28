export const renewalsApproveWorkflow = {
  module: "subscriptions/renewals",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for subscriptions/renewals record ${recordId}`;
  },
};
