export const accountsReceivableCancelWorkflow = {
  module: "finance/accounts-receivable",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/accounts-receivable record ${recordId}`;
  },
};
