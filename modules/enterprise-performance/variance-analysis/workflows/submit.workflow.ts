export const varianceAnalysisSubmitWorkflow = {
  module: "enterprise-performance/variance-analysis",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for enterprise-performance/variance-analysis record ${recordId}`;
  },
};
