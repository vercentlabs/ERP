export const financialReportsCancelWorkflow = {
  module: "finance/financial-reports",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for finance/financial-reports record ${recordId}`;
  },
};
