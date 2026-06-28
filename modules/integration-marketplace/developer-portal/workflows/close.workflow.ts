export const developerPortalCloseWorkflow = {
  module: "integration-marketplace/developer-portal",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for integration-marketplace/developer-portal record ${recordId}`;
  },
};
