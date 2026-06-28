export const channelSyncUpdateWorkflow = {
  module: "commerce/channel-sync",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for commerce/channel-sync record ${recordId}`;
  },
};
