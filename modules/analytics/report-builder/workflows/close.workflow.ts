export const reportBuilderCloseWorkflow = {
  module: "analytics/report-builder",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for analytics/report-builder record ${recordId}`;
  },
};
