export const performanceUpdateWorkflow = {
  module: "hr/performance",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for hr/performance record ${recordId}`;
  },
};
