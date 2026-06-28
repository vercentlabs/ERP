export const deduplicationRejectWorkflow = {
  module: "master-data/deduplication",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for master-data/deduplication record ${recordId}`;
  },
};
