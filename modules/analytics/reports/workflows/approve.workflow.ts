export const reportsApproveWorkflow = {
  module: "analytics/reports",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for analytics/reports record ${recordId}`;
  },
};
