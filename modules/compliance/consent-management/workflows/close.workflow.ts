export const consentManagementCloseWorkflow = {
  module: "compliance/consent-management",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for compliance/consent-management record ${recordId}`;
  },
};
