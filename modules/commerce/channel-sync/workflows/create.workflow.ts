export const channelSyncCreateWorkflow = {
  module: "commerce/channel-sync",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for commerce/channel-sync record ${recordId}`;
  },
};
