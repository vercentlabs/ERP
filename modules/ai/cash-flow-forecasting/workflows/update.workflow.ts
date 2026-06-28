export const cashFlowForecastingUpdateWorkflow = {
  module: "ai/cash-flow-forecasting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for ai/cash-flow-forecasting record ${recordId}`;
  },
};
