export const accountsReceivableUpdateWorkflow = {
  module: "finance/accounts-receivable",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/accounts-receivable record ${recordId}`;
  },
};
