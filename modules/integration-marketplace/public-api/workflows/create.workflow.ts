export const publicApiCreateWorkflow = {
  module: "integration-marketplace/public-api",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for integration-marketplace/public-api record ${recordId}`;
  },
};
