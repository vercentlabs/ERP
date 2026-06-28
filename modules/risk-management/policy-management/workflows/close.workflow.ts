export const policyManagementCloseWorkflow = {
  module: "risk-management/policy-management",
  action: "close",
  requiresAudit: true,
  ownerVisible: false,
  describe(recordId: string) {
    return `Close workflow for risk-management/policy-management record ${recordId}`;
  },
};
