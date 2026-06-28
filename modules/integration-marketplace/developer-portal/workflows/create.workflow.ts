export const developerPortalCreateWorkflow = {
  module: "integration-marketplace/developer-portal",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for integration-marketplace/developer-portal record ${recordId}`;
  },
};
