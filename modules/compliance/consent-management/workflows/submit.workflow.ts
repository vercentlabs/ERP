export const consentManagementSubmitWorkflow = {
  module: "compliance/consent-management",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for compliance/consent-management record ${recordId}`;
  },
};
