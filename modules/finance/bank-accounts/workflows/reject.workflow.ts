export const bankAccountsRejectWorkflow = {
  module: "finance/bank-accounts",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/bank-accounts record ${recordId}`;
  },
};
