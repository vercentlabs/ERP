export const generalLedgerRejectWorkflow = {
  module: "finance/general-ledger",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/general-ledger record ${recordId}`;
  },
};
