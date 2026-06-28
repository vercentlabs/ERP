export const demandForecastingRejectWorkflow = {
  module: "ai/demand-forecasting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for ai/demand-forecasting record ${recordId}`;
  },
};
