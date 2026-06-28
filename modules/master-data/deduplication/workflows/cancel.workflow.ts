export const deduplicationCancelWorkflow = {
  module: "master-data/deduplication",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for master-data/deduplication record ${recordId}`;
  },
};
