export const commentsCloseWorkflow = {
  module: "platform/comments",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/comments record ${recordId}`;
  },
};
