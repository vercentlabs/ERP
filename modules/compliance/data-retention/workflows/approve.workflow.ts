export const dataRetentionApproveWorkflow = {
  module: "compliance/data-retention",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for compliance/data-retention record ${recordId}`;
  },
};
