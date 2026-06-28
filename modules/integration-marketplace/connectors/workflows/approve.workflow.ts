export const connectorsApproveWorkflow = {
  module: "integration-marketplace/connectors",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for integration-marketplace/connectors record ${recordId}`;
  },
};
