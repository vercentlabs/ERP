export const bankReconciliationCloseWorkflow = {
  module: "finance/bank-reconciliation",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/bank-reconciliation record ${recordId}`;
  },
};
