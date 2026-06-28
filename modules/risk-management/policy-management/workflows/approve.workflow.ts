export const policyManagementApproveWorkflow = {
  module: "risk-management/policy-management",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for risk-management/policy-management record ${recordId}`;
  },
};
