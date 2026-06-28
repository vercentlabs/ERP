export const performanceRejectWorkflow = {
  module: "hr/performance",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for hr/performance record ${recordId}`;
  },
};
