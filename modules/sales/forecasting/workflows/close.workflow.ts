export const forecastingCloseWorkflow = {
  module: "sales/forecasting",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for sales/forecasting record ${recordId}`;
  },
};
