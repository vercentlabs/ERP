export const cashFlowUpdateWorkflow = {
  module: "finance/cash-flow",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/cash-flow record ${recordId}`;
  },
};
