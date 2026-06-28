export const performanceApproveWorkflow = {
  module: "hr/performance",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/performance record ${recordId}`;
  },
};
