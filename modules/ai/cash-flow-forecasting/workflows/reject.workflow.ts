export const cashFlowForecastingRejectWorkflow = {
  module: "ai/cash-flow-forecasting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for ai/cash-flow-forecasting record ${recordId}`;
  },
};
