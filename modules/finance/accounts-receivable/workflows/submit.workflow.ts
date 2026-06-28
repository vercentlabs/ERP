export const accountsReceivableSubmitWorkflow = {
  module: "finance/accounts-receivable",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/accounts-receivable record ${recordId}`;
  },
};
