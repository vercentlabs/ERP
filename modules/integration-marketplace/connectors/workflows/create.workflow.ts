export const connectorsCreateWorkflow = {
  module: "integration-marketplace/connectors",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for integration-marketplace/connectors record ${recordId}`;
  },
};
