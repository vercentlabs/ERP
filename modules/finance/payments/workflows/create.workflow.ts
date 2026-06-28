export const paymentsCreateWorkflow = {
  module: "finance/payments",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/payments record ${recordId}`;
  },
};
