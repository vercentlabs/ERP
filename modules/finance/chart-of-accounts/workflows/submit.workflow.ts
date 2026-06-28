export const chartOfAccountsSubmitWorkflow = {
  module: "finance/chart-of-accounts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/chart-of-accounts record ${recordId}`;
  },
};
