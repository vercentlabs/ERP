export const scheduledReportsCreateWorkflow = {
  module: "analytics/scheduled-reports",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for analytics/scheduled-reports record ${recordId}`;
  },
};
