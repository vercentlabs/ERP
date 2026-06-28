export const forecastingRejectWorkflow = {
  module: "sales/forecasting",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for sales/forecasting record ${recordId}`;
  },
};
