export const reportsCancelWorkflow = {
  module: "analytics/reports",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for analytics/reports record ${recordId}`;
  },
};
