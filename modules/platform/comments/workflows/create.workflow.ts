export const commentsCreateWorkflow = {
  module: "platform/comments",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for platform/comments record ${recordId}`;
  },
};
