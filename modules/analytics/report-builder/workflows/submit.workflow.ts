export const reportBuilderSubmitWorkflow = {
  module: "analytics/report-builder",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for analytics/report-builder record ${recordId}`;
  },
};
