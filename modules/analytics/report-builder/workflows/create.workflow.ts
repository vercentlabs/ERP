export const reportBuilderCreateWorkflow = {
  module: "analytics/report-builder",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for analytics/report-builder record ${recordId}`;
  },
};
