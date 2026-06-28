export const reportsCreateWorkflow = {
  module: "analytics/reports",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for analytics/reports record ${recordId}`;
  },
};
