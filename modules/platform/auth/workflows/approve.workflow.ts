export const authApproveWorkflow = {
  module: "platform/auth",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/auth record ${recordId}`;
  },
};
