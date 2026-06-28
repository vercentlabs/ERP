export const consentManagementApproveWorkflow = {
  module: "compliance/consent-management",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for compliance/consent-management record ${recordId}`;
  },
};
