export const customDashboardsApproveWorkflow = {
  module: "extension-studio/custom-dashboards",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for extension-studio/custom-dashboards record ${recordId}`;
  },
};
