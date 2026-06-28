export const consentManagementCreateWorkflow = {
  module: "compliance/consent-management",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for compliance/consent-management record ${recordId}`;
  },
};
