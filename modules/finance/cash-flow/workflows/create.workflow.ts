export const cashFlowCreateWorkflow = {
  module: "finance/cash-flow",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for finance/cash-flow record ${recordId}`;
  },
};
