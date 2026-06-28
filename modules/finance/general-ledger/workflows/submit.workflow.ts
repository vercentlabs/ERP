export const generalLedgerSubmitWorkflow = {
  module: "finance/general-ledger",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/general-ledger record ${recordId}`;
  },
};
