export const cashFlowSubmitWorkflow = {
  module: "finance/cash-flow",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/cash-flow record ${recordId}`;
  },
};
