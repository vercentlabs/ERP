export const dataRetentionUpdateWorkflow = {
  module: "compliance/data-retention",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for compliance/data-retention record ${recordId}`;
  },
};
