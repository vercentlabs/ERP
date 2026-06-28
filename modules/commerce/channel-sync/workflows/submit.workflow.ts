export const channelSyncSubmitWorkflow = {
  module: "commerce/channel-sync",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for commerce/channel-sync record ${recordId}`;
  },
};
