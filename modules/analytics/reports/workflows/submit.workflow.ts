export const reportsSubmitWorkflow = {
  module: "analytics/reports",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for analytics/reports record ${recordId}`;
  },
};
