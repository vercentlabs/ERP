export const chartOfAccountsCreateWorkflow = {
  module: "finance/chart-of-accounts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/chart-of-accounts record ${recordId}`;
  },
};
