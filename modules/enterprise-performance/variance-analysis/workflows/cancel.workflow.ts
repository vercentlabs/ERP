export const varianceAnalysisCancelWorkflow = {
  module: "enterprise-performance/variance-analysis",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for enterprise-performance/variance-analysis record ${recordId}`;
  },
};
