export const cashFlowForecastingSubmitWorkflow = {
  module: "ai/cash-flow-forecasting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for ai/cash-flow-forecasting record ${recordId}`;
  },
};
