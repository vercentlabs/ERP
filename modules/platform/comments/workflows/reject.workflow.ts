export const commentsRejectWorkflow = {
  module: "platform/comments",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/comments record ${recordId}`;
  },
};
