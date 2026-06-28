export const policyManagementUpdateWorkflow = {
  module: "risk-management/policy-management",
  action: "update",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Update workflow for risk-management/policy-management record ${recordId}`;
  },
};
