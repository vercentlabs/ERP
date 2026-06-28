export const policyManagementCreateWorkflow = {
  module: "risk-management/policy-management",
  action: "create",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Create workflow for risk-management/policy-management record ${recordId}`;
  },
};
