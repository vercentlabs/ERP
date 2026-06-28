export const forecastingSubmitWorkflow = {
  module: "enterprise-performance/forecasting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for enterprise-performance/forecasting record ${recordId}`;
  },
};
