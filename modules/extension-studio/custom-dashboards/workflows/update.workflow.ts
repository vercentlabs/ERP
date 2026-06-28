export const customDashboardsUpdateWorkflow = {
  module: "extension-studio/custom-dashboards",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for extension-studio/custom-dashboards record ${recordId}`;
  },
};
