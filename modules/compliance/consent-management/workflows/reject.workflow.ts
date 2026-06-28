export const consentManagementRejectWorkflow = {
  module: "compliance/consent-management",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for compliance/consent-management record ${recordId}`;
  },
};
