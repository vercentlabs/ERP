export const connectorsCloseWorkflow = {
  module: "integration-marketplace/connectors",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for integration-marketplace/connectors record ${recordId}`;
  },
};
