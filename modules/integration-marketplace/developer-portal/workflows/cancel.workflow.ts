export const developerPortalCancelWorkflow = {
  module: "integration-marketplace/developer-portal",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for integration-marketplace/developer-portal record ${recordId}`;
  },
};
