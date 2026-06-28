export const reportBuilderRejectWorkflow = {
  module: "analytics/report-builder",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for analytics/report-builder record ${recordId}`;
  },
};
