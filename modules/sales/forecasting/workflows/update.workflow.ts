export const forecastingUpdateWorkflow = {
  module: "sales/forecasting",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for sales/forecasting record ${recordId}`;
  },
};
