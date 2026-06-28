export const procurementPoliciesApproveWorkflow = {
  module: "procurement/procurement-policies",
  action: "approve",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Approve workflow for procurement/procurement-policies record ${recordId}`;
  },
};
