export const generalLedgerCloseWorkflow = {
  module: "finance/general-ledger",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/general-ledger record ${recordId}`;
  },
};
