export const dataRetentionCreateWorkflow = {
  module: "compliance/data-retention",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for compliance/data-retention record ${recordId}`;
  },
};
