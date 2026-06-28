export const publicApiSubmitWorkflow = {
  module: "integration-marketplace/public-api",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for integration-marketplace/public-api record ${recordId}`;
  },
};
