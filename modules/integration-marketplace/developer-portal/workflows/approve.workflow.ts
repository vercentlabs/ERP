export const developerPortalApproveWorkflow = {
  module: "integration-marketplace/developer-portal",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for integration-marketplace/developer-portal record ${recordId}`;
  },
};
