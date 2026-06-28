export const demandForecastingUpdateWorkflow = {
  module: "ai/demand-forecasting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for ai/demand-forecasting record ${recordId}`;
  },
};
