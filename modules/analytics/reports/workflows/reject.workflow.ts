export const reportsRejectWorkflow = {
  module: "analytics/reports",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for analytics/reports record ${recordId}`;
  },
};
