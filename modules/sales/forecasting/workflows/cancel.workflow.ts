export const forecastingCancelWorkflow = {
  module: "sales/forecasting",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for sales/forecasting record ${recordId}`;
  },
};
