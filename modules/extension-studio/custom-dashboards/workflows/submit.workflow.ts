export const customDashboardsSubmitWorkflow = {
  module: "extension-studio/custom-dashboards",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for extension-studio/custom-dashboards record ${recordId}`;
  },
};
