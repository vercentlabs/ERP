export const subLedgersUpdateWorkflow = {
  module: "finance/sub-ledgers",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/sub-ledgers record ${recordId}`;
  },
};
