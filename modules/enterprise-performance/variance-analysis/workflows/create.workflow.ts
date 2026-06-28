export const varianceAnalysisCreateWorkflow = {
  module: "enterprise-performance/variance-analysis",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for enterprise-performance/variance-analysis record ${recordId}`;
  },
};
