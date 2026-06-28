export const demandForecastingSubmitWorkflow = {
  module: "ai/demand-forecasting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for ai/demand-forecasting record ${recordId}`;
  },
};
