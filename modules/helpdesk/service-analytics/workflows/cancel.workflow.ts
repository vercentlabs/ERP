export const serviceAnalyticsCancelWorkflow = {
  module: "helpdesk/service-analytics",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for helpdesk/service-analytics record ${recordId}`;
  },
};
