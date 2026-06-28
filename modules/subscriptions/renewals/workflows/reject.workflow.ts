export const renewalsRejectWorkflow = {
  module: "subscriptions/renewals",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for subscriptions/renewals record ${recordId}`;
  },
};
