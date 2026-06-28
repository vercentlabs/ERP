export const bankAccountsSubmitWorkflow = {
  module: "finance/bank-accounts",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/bank-accounts record ${recordId}`;
  },
};
