export const commentsApproveWorkflow = {
  module: "platform/comments",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for platform/comments record ${recordId}`;
  },
};
