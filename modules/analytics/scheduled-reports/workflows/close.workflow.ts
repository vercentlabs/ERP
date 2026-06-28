export const scheduledReportsCloseWorkflow = {
  module: "analytics/scheduled-reports",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for analytics/scheduled-reports record ${recordId}`;
  },
};
