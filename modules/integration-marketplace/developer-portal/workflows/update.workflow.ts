export const developerPortalUpdateWorkflow = {
  module: "integration-marketplace/developer-portal",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for integration-marketplace/developer-portal record ${recordId}`;
  },
};
