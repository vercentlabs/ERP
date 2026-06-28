export const publicApiApproveWorkflow = {
  module: "integration-marketplace/public-api",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for integration-marketplace/public-api record ${recordId}`;
  },
};
