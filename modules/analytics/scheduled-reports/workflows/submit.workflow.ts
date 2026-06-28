export const scheduledReportsSubmitWorkflow = {
  module: "analytics/scheduled-reports",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for analytics/scheduled-reports record ${recordId}`;
  },
};
