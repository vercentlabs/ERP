export const scheduledReportsRejectWorkflow = {
  module: "analytics/scheduled-reports",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for analytics/scheduled-reports record ${recordId}`;
  },
};
