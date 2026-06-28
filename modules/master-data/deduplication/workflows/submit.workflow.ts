export const deduplicationSubmitWorkflow = {
  module: "master-data/deduplication",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for master-data/deduplication record ${recordId}`;
  },
};
