export const policyManagementSubmitWorkflow = {
  module: "risk-management/policy-management",
  action: "submit",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Submit workflow for risk-management/policy-management record ${recordId}`;
  },
};
