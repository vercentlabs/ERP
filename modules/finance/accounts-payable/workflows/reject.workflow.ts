export const accountsPayableRejectWorkflow = {
  module: "finance/accounts-payable",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/accounts-payable record ${recordId}`;
  },
};
