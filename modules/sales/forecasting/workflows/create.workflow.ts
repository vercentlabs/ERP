export const forecastingCreateWorkflow = {
  module: "sales/forecasting",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for sales/forecasting record ${recordId}`;
  },
};
