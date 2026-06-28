export const forecastingApproveWorkflow = {
  module: "sales/forecasting",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for sales/forecasting record ${recordId}`;
  },
};
