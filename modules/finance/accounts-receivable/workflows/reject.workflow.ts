export const accountsReceivableRejectWorkflow = {
  module: "finance/accounts-receivable",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/accounts-receivable record ${recordId}`;
  },
};
