export const profitCentersSubmitWorkflow = {
  module: "finance/profit-centers",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/profit-centers record ${recordId}`;
  },
};
