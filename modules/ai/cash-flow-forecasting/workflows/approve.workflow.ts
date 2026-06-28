export const cashFlowForecastingApproveWorkflow = {
  module: "ai/cash-flow-forecasting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for ai/cash-flow-forecasting record ${recordId}`;
  },
};
