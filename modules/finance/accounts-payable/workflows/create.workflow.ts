export const accountsPayableCreateWorkflow = {
  module: "finance/accounts-payable",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/accounts-payable record ${recordId}`;
  },
};
