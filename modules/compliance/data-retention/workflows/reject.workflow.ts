export const dataRetentionRejectWorkflow = {
  module: "compliance/data-retention",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for compliance/data-retention record ${recordId}`;
  },
};
