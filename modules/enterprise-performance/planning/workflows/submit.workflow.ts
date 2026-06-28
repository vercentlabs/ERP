export const planningSubmitWorkflow = {
  module: "enterprise-performance/planning",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for enterprise-performance/planning record ${recordId}`;
  },
};
