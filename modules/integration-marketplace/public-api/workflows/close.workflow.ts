export const publicApiCloseWorkflow = {
  module: "integration-marketplace/public-api",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for integration-marketplace/public-api record ${recordId}`;
  },
};
