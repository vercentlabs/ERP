export const paymentsApproveWorkflow = {
  module: "finance/payments",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/payments record ${recordId}`;
  },
};
