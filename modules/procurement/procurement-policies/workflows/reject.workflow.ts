export const procurementPoliciesRejectWorkflow = {
  module: "procurement/procurement-policies",
  action: "reject",
  requiresAudit: true,
  ownerVisible: true,
  describe(recordId: string) {
    return `Reject workflow for procurement/procurement-policies record ${recordId}`;
  },
};
