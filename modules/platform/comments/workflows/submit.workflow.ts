export const commentsSubmitWorkflow = {
  module: "platform/comments",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for platform/comments record ${recordId}`;
  },
};
