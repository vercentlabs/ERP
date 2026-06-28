export const searchRejectWorkflow = {
  module: "platform/search",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for platform/search record ${recordId}`;
  },
};
