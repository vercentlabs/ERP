export const forecastingCloseWorkflow = {
  module: "enterprise-performance/forecasting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for enterprise-performance/forecasting record ${recordId}`;
  },
};
