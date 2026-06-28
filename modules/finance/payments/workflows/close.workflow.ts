export const paymentsCloseWorkflow = {
  module: "finance/payments",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/payments record ${recordId}`;
  },
};
