export const bankReconciliationCancelWorkflow = {
  module: "finance/bank-reconciliation",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/bank-reconciliation record ${recordId}`;
  },
};
