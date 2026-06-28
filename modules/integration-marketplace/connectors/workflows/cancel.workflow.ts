export const connectorsCancelWorkflow = {
  module: "integration-marketplace/connectors",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for integration-marketplace/connectors record ${recordId}`;
  },
};
