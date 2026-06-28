export const paymentsSubmitWorkflow = {
  module: "finance/payments",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/payments record ${recordId}`;
  },
};
