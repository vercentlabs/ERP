export const consentManagementUpdateWorkflow = {
  module: "compliance/consent-management",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for compliance/consent-management record ${recordId}`;
  },
};
