export const publicApiRejectWorkflow = {
  module: "integration-marketplace/public-api",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for integration-marketplace/public-api record ${recordId}`;
  },
};
