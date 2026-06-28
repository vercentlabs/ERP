export const accountsPayableCloseWorkflow = {
  module: "finance/accounts-payable",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/accounts-payable record ${recordId}`;
  },
};
