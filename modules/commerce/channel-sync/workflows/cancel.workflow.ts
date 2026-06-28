export const channelSyncCancelWorkflow = {
  module: "commerce/channel-sync",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for commerce/channel-sync record ${recordId}`;
  },
};
