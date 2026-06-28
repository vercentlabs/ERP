export const chartOfAccountsCloseWorkflow = {
  module: "finance/chart-of-accounts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/chart-of-accounts record ${recordId}`;
  },
};
