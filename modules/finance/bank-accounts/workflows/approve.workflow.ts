export const bankAccountsApproveWorkflow = {
  module: "finance/bank-accounts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/bank-accounts record ${recordId}`;
  },
};
