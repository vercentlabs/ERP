export const varianceAnalysisApproveWorkflow = {
  module: "enterprise-performance/variance-analysis",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for enterprise-performance/variance-analysis record ${recordId}`;
  },
};
