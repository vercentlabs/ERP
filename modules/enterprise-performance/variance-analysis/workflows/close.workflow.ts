export const varianceAnalysisCloseWorkflow = {
  module: "enterprise-performance/variance-analysis",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for enterprise-performance/variance-analysis record ${recordId}`;
  },
};
