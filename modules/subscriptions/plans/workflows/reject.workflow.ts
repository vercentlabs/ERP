export const plansRejectWorkflow = {
  module: "subscriptions/plans",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for subscriptions/plans record ${recordId}`;
  },
};
