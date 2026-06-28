export const generalLedgerApproveWorkflow = {
  module: "finance/general-ledger",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/general-ledger record ${recordId}`;
  },
};
