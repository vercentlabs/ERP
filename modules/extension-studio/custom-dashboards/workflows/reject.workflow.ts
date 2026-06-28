export const customDashboardsRejectWorkflow = {
  module: "extension-studio/custom-dashboards",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for extension-studio/custom-dashboards record ${recordId}`;
  },
};
