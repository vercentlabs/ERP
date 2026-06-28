export const financialReportsUpdateWorkflow = {
  module: "finance/financial-reports",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for finance/financial-reports record ${recordId}`;
  },
};
