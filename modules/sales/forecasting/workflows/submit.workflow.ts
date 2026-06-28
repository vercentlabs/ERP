export const forecastingSubmitWorkflow = {
  module: "sales/forecasting",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for sales/forecasting record ${recordId}`;
  },
};
