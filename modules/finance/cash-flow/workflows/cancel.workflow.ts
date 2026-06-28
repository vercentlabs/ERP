export const cashFlowCancelWorkflow = {
  module: "finance/cash-flow",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/cash-flow record ${recordId}`;
  },
};
