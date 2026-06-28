export const serviceAnalyticsCloseWorkflow = {
  module: "helpdesk/service-analytics",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for helpdesk/service-analytics record ${recordId}`;
  },
};
