export const varianceAnalysisRejectWorkflow = {
  module: "enterprise-performance/variance-analysis",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for enterprise-performance/variance-analysis record ${recordId}`;
  },
};
