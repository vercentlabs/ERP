export const serviceAnalyticsCreateWorkflow = {
  module: "helpdesk/service-analytics",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for helpdesk/service-analytics record ${recordId}`;
  },
};
