export const forecastingRejectWorkflow = {
  module: "enterprise-performance/forecasting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for enterprise-performance/forecasting record ${recordId}`;
  },
};
