export const subLedgersCancelWorkflow = {
  module: "finance/sub-ledgers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/sub-ledgers record ${recordId}`;
  },
};
