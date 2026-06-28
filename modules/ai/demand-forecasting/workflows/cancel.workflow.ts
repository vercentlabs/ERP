export const demandForecastingCancelWorkflow = {
  module: "ai/demand-forecasting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for ai/demand-forecasting record ${recordId}`;
  },
};
