export const forecastingCreateWorkflow = {
  module: "enterprise-performance/forecasting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for enterprise-performance/forecasting record ${recordId}`;
  },
};
