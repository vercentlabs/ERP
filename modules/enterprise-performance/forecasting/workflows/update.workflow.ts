export const forecastingUpdateWorkflow = {
  module: "enterprise-performance/forecasting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for enterprise-performance/forecasting record ${recordId}`;
  },
};
