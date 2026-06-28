export const commentsUpdateWorkflow = {
  module: "platform/comments",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/comments record ${recordId}`;
  },
};
