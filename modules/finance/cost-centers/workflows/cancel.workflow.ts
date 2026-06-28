export const costCentersCancelWorkflow = {
  module: "finance/cost-centers",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/cost-centers record ${recordId}`;
  },
};
