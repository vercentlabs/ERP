export const accountsPayableApproveWorkflow = {
  module: "finance/accounts-payable",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/accounts-payable record ${recordId}`;
  },
};
