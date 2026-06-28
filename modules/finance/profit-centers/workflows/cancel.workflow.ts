export const profitCentersCancelWorkflow = {
  module: "finance/profit-centers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/profit-centers record ${recordId}`;
  },
};
