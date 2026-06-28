export const publicApiCancelWorkflow = {
  module: "integration-marketplace/public-api",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for integration-marketplace/public-api record ${recordId}`;
  },
};
