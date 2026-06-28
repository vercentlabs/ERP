export const developerPortalSubmitWorkflow = {
  module: "integration-marketplace/developer-portal",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for integration-marketplace/developer-portal record ${recordId}`;
  },
};
