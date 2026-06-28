export const accountsPayableUpdateWorkflow = {
  module: "finance/accounts-payable",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/accounts-payable record ${recordId}`;
  },
};
