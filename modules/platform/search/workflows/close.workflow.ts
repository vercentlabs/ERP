export const searchCloseWorkflow = {
  module: "platform/search",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for platform/search record ${recordId}`;
  },
};
