export const bankAccountsCloseWorkflow = {
  module: "finance/bank-accounts",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/bank-accounts record ${recordId}`;
  },
};
