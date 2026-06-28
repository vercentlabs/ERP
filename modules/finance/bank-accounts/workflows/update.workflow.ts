export const bankAccountsUpdateWorkflow = {
  module: "finance/bank-accounts",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/bank-accounts record ${recordId}`;
  },
};
