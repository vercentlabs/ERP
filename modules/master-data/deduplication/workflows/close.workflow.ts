export const deduplicationCloseWorkflow = {
  module: "master-data/deduplication",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for master-data/deduplication record ${recordId}`;
  },
};
