export const bankReconciliationCreateWorkflow = {
  module: "finance/bank-reconciliation",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/bank-reconciliation record ${recordId}`;
  },
};
