export const customDashboardsCreateWorkflow = {
  module: "extension-studio/custom-dashboards",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for extension-studio/custom-dashboards record ${recordId}`;
  },
};
