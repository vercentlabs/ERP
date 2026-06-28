export const reportBuilderCancelWorkflow = {
  module: "analytics/report-builder",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for analytics/report-builder record ${recordId}`;
  },
};
