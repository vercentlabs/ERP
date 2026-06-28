export const accountsReceivableCloseWorkflow = {
  module: "finance/accounts-receivable",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/accounts-receivable record ${recordId}`;
  },
};
