export const chartOfAccountsRejectWorkflow = {
  module: "finance/chart-of-accounts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/chart-of-accounts record ${recordId}`;
  },
};
