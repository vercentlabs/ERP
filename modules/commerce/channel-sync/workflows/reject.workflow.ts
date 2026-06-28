export const channelSyncRejectWorkflow = {
  module: "commerce/channel-sync",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for commerce/channel-sync record ${recordId}`;
  },
};
