export const accountsReceivableCreateWorkflow = {
  module: "finance/accounts-receivable",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/accounts-receivable record ${recordId}`;
  },
};
