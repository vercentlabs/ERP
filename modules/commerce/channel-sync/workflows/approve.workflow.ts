export const channelSyncApproveWorkflow = {
  module: "commerce/channel-sync",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for commerce/channel-sync record ${recordId}`;
  },
};
