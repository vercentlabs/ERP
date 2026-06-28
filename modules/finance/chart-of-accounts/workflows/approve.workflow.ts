export const chartOfAccountsApproveWorkflow = {
  module: "finance/chart-of-accounts",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/chart-of-accounts record ${recordId}`;
  },
};
