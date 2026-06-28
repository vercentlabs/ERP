export const serviceAnalyticsRejectWorkflow = {
  module: "helpdesk/service-analytics",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for helpdesk/service-analytics record ${recordId}`;
  },
};
