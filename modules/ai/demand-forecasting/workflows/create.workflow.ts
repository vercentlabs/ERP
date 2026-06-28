export const demandForecastingCreateWorkflow = {
  module: "ai/demand-forecasting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for ai/demand-forecasting record ${recordId}`;
  },
};
