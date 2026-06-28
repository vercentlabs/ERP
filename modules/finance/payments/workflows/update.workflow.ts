export const paymentsUpdateWorkflow = {
  module: "finance/payments",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/payments record ${recordId}`;
  },
};
