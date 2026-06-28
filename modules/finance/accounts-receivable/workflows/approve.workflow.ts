export const accountsReceivableApproveWorkflow = {
  module: "finance/accounts-receivable",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/accounts-receivable record ${recordId}`;
  },
};
