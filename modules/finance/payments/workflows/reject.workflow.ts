export const paymentsRejectWorkflow = {
  module: "finance/payments",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/payments record ${recordId}`;
  },
};
