export const serviceAnalyticsSubmitWorkflow = {
  module: "helpdesk/service-analytics",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for helpdesk/service-analytics record ${recordId}`;
  },
};
