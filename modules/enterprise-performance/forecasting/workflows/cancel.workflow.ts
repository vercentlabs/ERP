export const forecastingCancelWorkflow = {
  module: "enterprise-performance/forecasting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for enterprise-performance/forecasting record ${recordId}`;
  },
};
