export const scheduledReportsApproveWorkflow = {
  module: "analytics/scheduled-reports",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for analytics/scheduled-reports record ${recordId}`;
  },
};
