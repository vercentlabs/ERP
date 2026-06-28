export const accountsPayableSubmitWorkflow = {
  module: "finance/accounts-payable",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/accounts-payable record ${recordId}`;
  },
};
