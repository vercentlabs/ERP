export const reportBuilderUpdateWorkflow = {
  module: "analytics/report-builder",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for analytics/report-builder record ${recordId}`;
  },
};
