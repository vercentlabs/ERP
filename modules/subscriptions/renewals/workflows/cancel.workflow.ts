export const renewalsCancelWorkflow = {
  module: "subscriptions/renewals",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for subscriptions/renewals record ${recordId}`;
  },
};
