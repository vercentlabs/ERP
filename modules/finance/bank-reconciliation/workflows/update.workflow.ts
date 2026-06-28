export const bankReconciliationUpdateWorkflow = {
  module: "finance/bank-reconciliation",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/bank-reconciliation record ${recordId}`;
  },
};
