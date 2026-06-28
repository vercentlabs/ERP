export const deduplicationCreateWorkflow = {
  module: "master-data/deduplication",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for master-data/deduplication record ${recordId}`;
  },
};
