export const consentManagementCancelWorkflow = {
  module: "compliance/consent-management",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for compliance/consent-management record ${recordId}`;
  },
};
