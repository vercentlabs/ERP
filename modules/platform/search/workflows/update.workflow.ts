export const searchUpdateWorkflow = {
  module: "platform/search",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for platform/search record ${recordId}`;
  },
};
