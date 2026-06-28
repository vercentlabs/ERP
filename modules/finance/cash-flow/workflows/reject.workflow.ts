export const cashFlowRejectWorkflow = {
  module: "finance/cash-flow",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for finance/cash-flow record ${recordId}`;
  },
};
