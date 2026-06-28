export const connectorsSubmitWorkflow = {
  module: "integration-marketplace/connectors",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for integration-marketplace/connectors record ${recordId}`;
  },
};
