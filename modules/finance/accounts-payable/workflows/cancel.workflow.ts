export const accountsPayableCancelWorkflow = {
  module: "finance/accounts-payable",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/accounts-payable record ${recordId}`;
  },
};
