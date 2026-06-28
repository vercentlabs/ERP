export const subLedgersApproveWorkflow = {
  module: "finance/sub-ledgers",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/sub-ledgers record ${recordId}`;
  },
};
