export const learningApproveWorkflow = {
  module: "hr/learning",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for hr/learning record ${recordId}`;
  },
};
