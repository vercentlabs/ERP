export const bankAccountsCancelWorkflow = {
  module: "finance/bank-accounts",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/bank-accounts record ${recordId}`;
  },
};
