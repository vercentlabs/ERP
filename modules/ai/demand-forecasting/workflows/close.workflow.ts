export const demandForecastingCloseWorkflow = {
  module: "ai/demand-forecasting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for ai/demand-forecasting record ${recordId}`;
  },
};
