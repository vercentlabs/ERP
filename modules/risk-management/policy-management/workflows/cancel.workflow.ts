export const policyManagementCancelWorkflow = {
  module: "risk-management/policy-management",
  action: "cancel",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Cancel workflow for risk-management/policy-management record ${recordId}`;
  },
};
