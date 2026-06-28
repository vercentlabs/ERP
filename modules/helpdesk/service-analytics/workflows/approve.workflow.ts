export const serviceAnalyticsApproveWorkflow = {
  module: "helpdesk/service-analytics",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for helpdesk/service-analytics record ${recordId}`;
  },
};
