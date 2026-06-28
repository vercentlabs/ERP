export const subLedgersCreateWorkflow = {
  module: "finance/sub-ledgers",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/sub-ledgers record ${recordId}`;
  },
};
