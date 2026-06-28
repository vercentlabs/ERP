export const reportBuilderApproveWorkflow = {
  module: "analytics/report-builder",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for analytics/report-builder record ${recordId}`;
  },
};
