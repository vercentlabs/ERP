export const cashFlowApproveWorkflow = {
  module: "finance/cash-flow",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for finance/cash-flow record ${recordId}`;
  },
};
