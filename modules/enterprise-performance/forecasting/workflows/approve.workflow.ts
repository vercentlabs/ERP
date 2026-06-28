export const forecastingApproveWorkflow = {
  module: "enterprise-performance/forecasting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for enterprise-performance/forecasting record ${recordId}`;
  },
};
