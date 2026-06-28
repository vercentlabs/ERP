export const dataRetentionCancelWorkflow = {
  module: "compliance/data-retention",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for compliance/data-retention record ${recordId}`;
  },
};
