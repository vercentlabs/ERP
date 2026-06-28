export const subLedgersCloseWorkflow = {
  module: "finance/sub-ledgers",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/sub-ledgers record ${recordId}`;
  },
};
