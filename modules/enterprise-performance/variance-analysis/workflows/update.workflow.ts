export const varianceAnalysisUpdateWorkflow = {
  module: "enterprise-performance/variance-analysis",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for enterprise-performance/variance-analysis record ${recordId}`;
  },
};
