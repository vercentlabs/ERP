export const searchCancelWorkflow = {
  module: "platform/search",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for platform/search record ${recordId}`;
  },
};
