export const policyManagementRejectWorkflow = {
  module: "risk-management/policy-management",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for risk-management/policy-management record ${recordId}`;
  },
};
