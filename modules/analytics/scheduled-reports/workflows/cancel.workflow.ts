export const scheduledReportsCancelWorkflow = {
  module: "analytics/scheduled-reports",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for analytics/scheduled-reports record ${recordId}`;
  },
};
