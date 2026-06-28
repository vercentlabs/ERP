export const publicApiUpdateWorkflow = {
  module: "integration-marketplace/public-api",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for integration-marketplace/public-api record ${recordId}`;
  },
};
