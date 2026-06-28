export const cashFlowForecastingCloseWorkflow = {
  module: "ai/cash-flow-forecasting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for ai/cash-flow-forecasting record ${recordId}`;
  },
};
