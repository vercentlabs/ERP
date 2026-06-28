export const bankAccountsCreateWorkflow = {
  module: "finance/bank-accounts",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/bank-accounts record ${recordId}`;
  },
};
