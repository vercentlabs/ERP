export const serviceAnalyticsUpdateWorkflow = {
  module: "helpdesk/service-analytics",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for helpdesk/service-analytics record ${recordId}`;
  },
};
