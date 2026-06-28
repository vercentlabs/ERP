export const bankReconciliationSubmitWorkflow = {
  module: "finance/bank-reconciliation",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/bank-reconciliation record ${recordId}`;
  },
};
