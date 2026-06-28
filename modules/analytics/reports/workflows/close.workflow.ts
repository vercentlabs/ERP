export const reportsCloseWorkflow = {
  module: "analytics/reports",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for analytics/reports record ${recordId}`;
  },
};
