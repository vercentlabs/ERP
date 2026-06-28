export const commentsCancelWorkflow = {
  module: "platform/comments",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/comments record ${recordId}`;
  },
};
