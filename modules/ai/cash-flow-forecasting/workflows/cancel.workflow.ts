export const cashFlowForecastingCancelWorkflow = {
  module: "ai/cash-flow-forecasting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for ai/cash-flow-forecasting record ${recordId}`;
  },
};
