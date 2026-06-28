export const cashFlowCloseWorkflow = {
  module: "finance/cash-flow",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/cash-flow record ${recordId}`;
  },
};
