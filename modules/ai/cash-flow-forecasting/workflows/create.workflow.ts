export const cashFlowForecastingCreateWorkflow = {
  module: "ai/cash-flow-forecasting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for ai/cash-flow-forecasting record ${recordId}`;
  },
};
