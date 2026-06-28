export const consolidationSubmitWorkflow = {
  module: "finance/consolidation",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for finance/consolidation record ${recordId}`;
  },
};
