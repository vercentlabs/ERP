export const connectorsUpdateWorkflow = {
  module: "integration-marketplace/connectors",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for integration-marketplace/connectors record ${recordId}`;
  },
};
