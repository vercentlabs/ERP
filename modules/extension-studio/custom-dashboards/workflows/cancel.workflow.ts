export const customDashboardsCancelWorkflow = {
  module: "extension-studio/custom-dashboards",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for extension-studio/custom-dashboards record ${recordId}`;
  },
};
