export const bankReconciliationRejectWorkflow = {
  module: "finance/bank-reconciliation",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/bank-reconciliation record ${recordId}`;
  },
};
