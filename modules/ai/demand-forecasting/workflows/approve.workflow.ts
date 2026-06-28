export const demandForecastingApproveWorkflow = {
  module: "ai/demand-forecasting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for ai/demand-forecasting record ${recordId}`;
  },
};
