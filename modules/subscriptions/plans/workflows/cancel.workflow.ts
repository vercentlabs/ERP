export const plansCancelWorkflow = {
  module: "subscriptions/plans",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for subscriptions/plans record ${recordId}`;
  },
};
