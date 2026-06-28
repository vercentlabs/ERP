export const developerPortalRejectWorkflow = {
  module: "integration-marketplace/developer-portal",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for integration-marketplace/developer-portal record ${recordId}`;
  },
};
