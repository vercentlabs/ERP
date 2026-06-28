export const chartOfAccountsUpdateWorkflow = {
  module: "finance/chart-of-accounts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/chart-of-accounts record ${recordId}`;
  },
};
