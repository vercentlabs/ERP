export const customDashboardsCloseWorkflow = {
  module: "extension-studio/custom-dashboards",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for extension-studio/custom-dashboards record ${recordId}`;
  },
};
