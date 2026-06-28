export const subLedgersRejectWorkflow = {
  module: "finance/sub-ledgers",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/sub-ledgers record ${recordId}`;
  },
};
