export const generalLedgerCreateWorkflow = {
  module: "finance/general-ledger",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/general-ledger record ${recordId}`;
  },
};
