export const bankReconciliationApproveWorkflow = {
  module: "finance/bank-reconciliation",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/bank-reconciliation record ${recordId}`;
  },
};
