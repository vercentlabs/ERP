export const deduplicationUpdateWorkflow = {
  module: "master-data/deduplication",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for master-data/deduplication record ${recordId}`;
  },
};
