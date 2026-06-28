export const financialReportsCloseWorkflow = {
  module: "finance/financial-reports",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for finance/financial-reports record ${recordId}`;
  },
};
