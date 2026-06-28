export const paymentsCancelWorkflow = {
  module: "finance/payments",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/payments record ${recordId}`;
  },
};
