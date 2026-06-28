export const subLedgersSubmitWorkflow = {
  module: "finance/sub-ledgers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/sub-ledgers record ${recordId}`;
  },
};
