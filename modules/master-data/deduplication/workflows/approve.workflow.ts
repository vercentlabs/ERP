export const deduplicationApproveWorkflow = {
  module: "master-data/deduplication",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for master-data/deduplication record ${recordId}`;
  },
};
