export const connectorsRejectWorkflow = {
  module: "integration-marketplace/connectors",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for integration-marketplace/connectors record ${recordId}`;
  },
};
