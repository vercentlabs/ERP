export const channelSyncCloseWorkflow = {
  module: "commerce/channel-sync",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for commerce/channel-sync record ${recordId}`;
  },
};
